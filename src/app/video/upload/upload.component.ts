import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventBlockerDirective } from '../../directives/event-blocker.directive';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-upload',
  imports: [EventBlockerDirective, CommonModule, ReactiveFormsModule, InputComponent],
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  isDragover = false;
  nextStep = false;

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
    console.log('File uploaded');
  }
}
