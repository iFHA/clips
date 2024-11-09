import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(public modalService: ModalService) {
  }
  public openModal(event: MouseEvent) {
    event.preventDefault();
    this.modalService.toggleModal('auth');
  }
}
