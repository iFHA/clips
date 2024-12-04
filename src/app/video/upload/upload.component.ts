import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { EventBlockerDirective } from '../../directives/event-blocker.directive';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { v4 as uuid } from 'uuid';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { AlertComponent } from '../../alert/alert.component';
import { AuthService } from '../../services/auth.service';
import IClip from '../../models/clip.model';
import { ClipService } from '../../services/clip.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Router } from '@angular/router';

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
export class UploadComponent implements OnDestroy {
  isDragover = false;
  nextStep = false;

  showAlert = false;
  alertMsg = 'Por favor, aguarde, o upload está sendo realizado.';
  alertColor = 'blue';
  inSubmission = false;
  downloadURL = '';

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

  constructor (
    private readonly auth: AuthService,
    private readonly clipService: ClipService,
    private readonly fileUploadService: FileUploadService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.fileUploadService.cancelUpload();
  }

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent)?.dataTransfer ?
    ($event as DragEvent)?.dataTransfer?.files.item(0) ?? null :
    ($event.target as HTMLInputElement).files?.item(0) ?? null;

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
      const path = `clips/${clipFileName}.mp4`;

      this.fileUploadService.uploadFile(this.file, path).subscribe({
        next: async upload => {
          const progress = upload.progress.toFixed(0);
          if(progress === '100') {
            this.downloadURL = upload.downloadURL as string;
          } else {
            this.alertMsg = `Upload sendo realizado, ${progress}% feito`;
          }
        },
        error: error => {
          this.alertColor = 'red';
          this.alertMsg = 'Erro ao realizar o upload!';
          this.inSubmission = false;
          this.uploadForm.enable();
          console.error('Upload failed:', error);
        },
        complete: async () => {
          const clip: IClip = {
            uid: this.auth.getCurrentUser()?.uid as string,
            displayName: this.auth.getCurrentUser()?.displayName as string,
            title: this.title.value,
            fileName: `${clipFileName}.mp4`,
            url: this.downloadURL as string
          }

          const docRef = await this.clipService.createClip(clip);

          this.alertColor = 'green';
          this.alertMsg = `Upload realizado com sucesso!`;
          this.inSubmission = false;
          this.uploadForm.enable();

          setTimeout(()=>{
            this.router.navigate(['clip', docRef.id]);
          }, 1000);
        }
      });
    }
  }
}
