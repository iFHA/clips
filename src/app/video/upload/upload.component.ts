import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventBlockerDirective } from '../../directives/event-blocker.directive';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { v4 as uuid } from 'uuid';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { AlertComponent } from '../../alert/alert.component';
import { AuthService } from '../../services/auth.service';
import IClip from '../../models/clip.model';
import { ClipService } from '../../services/clip.service';

@Component({
  selector: 'app-upload',
  imports: [
    EventBlockerDirective,
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    AlertComponent
  ],
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  isDragover = false;
  nextStep = false;

  showAlert = false;
  alertMsg = 'Por favor, aguarde, o upload está sendo realizado.';
  alertColor = 'blue';
  inSubmission = false;

  title = new FormControl<string>('', {
    validators:[
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  });

  uploadForm = new FormGroup({
    title: this.title
  });

  file: File | null = null;

  constructor(
    private readonly auth: AuthService,
    private readonly clipService: ClipService
  ) {}

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent)?.dataTransfer?.files.item(0) ?? null;

    if(!this.file || this.file.type !== 'video/mp4') {
      return;
    }
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  uploadFile() {
    if(this.file){

      this.uploadForm.disable();

      this.showAlert = true;
      this.alertColor = 'blue';
      this.inSubmission = true;

      const clipFileName = uuid();
      const storage = getStorage();
      const storageRef = ref(storage, `clips/${clipFileName}.mp4`);
      const uploadTask = uploadBytesResumable(storageRef, this.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
          this.alertMsg = `Upload sendo realizado, ${progress}% feito`;
        },
        (error) => {
          this.alertColor = 'red';
          this.alertMsg = 'Erro ao realizar o upload!';
          this.inSubmission = false;
          this.uploadForm.enable();
          console.error('Upload failed:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const clip: IClip = {
            uid: this.auth.getCurrentUser()?.uid as string,
            displayName: this.auth.getCurrentUser()?.displayName as string,
            title: this.title.value,
            fileName: `${clipFileName}.mp4`,
            url: downloadURL
          }

          await this.clipService.createClip(clip);

          this.alertColor = 'green';
          this.alertMsg = `Upload realizado com sucesso!`;
          this.inSubmission = false;
          this.uploadForm.enable();
        }
      );
    }
  }
}
