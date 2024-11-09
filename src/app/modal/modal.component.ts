import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  @Input()
  modalId = '';
  constructor(public service:ModalService, public el: ElementRef) {
  }

  ngOnInit(): void {
    // evitando que algum css pai interfira nos elementos do modal
    document.body.appendChild(this.el.nativeElement);
  }

  closeModal(): void {
    this.service.toggleModal(this.modalId);
  }
}
