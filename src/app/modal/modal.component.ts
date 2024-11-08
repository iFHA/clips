import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(public service:ModalService) {
    console.log(this.service.isModalOpen());
  }
  closeModal(): void {
    this.service.toggleModal();
  }
}
