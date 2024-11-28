import { Component } from '@angular/core';
import { EventBlockerDirective } from '../../directives/event-blocker.directive';

@Component({
  selector: 'app-upload',
  imports: [EventBlockerDirective],
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

}
