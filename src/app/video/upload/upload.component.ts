import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventBlockerDirective } from '../../directives/event-blocker.directive';

@Component({
  selector: 'app-upload',
  imports: [EventBlockerDirective, CommonModule],
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  isDragover = false;
  nextStep = false;

  file: File | null = null;

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent)?.dataTransfer?.files.item(0) ?? null;

    if(!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.nextStep = true;
  }
}
