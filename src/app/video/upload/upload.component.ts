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

  storeFile($event: Event) {
    this.isDragover = false;
  }
}
