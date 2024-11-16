import { Component, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input()
  modalId = '';
  constructor(public service:ModalService, public el: ElementRef) {
  }

  closeModal(): void {
    this.service.toggleModal(this.modalId);
  }

  ngOnInit(): void {
    // evitando que algum css pai interfira nos elementos do modal
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }

}
