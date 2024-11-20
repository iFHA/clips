import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(
    public modalService: ModalService,
    public authService: AuthService
  ) {
  }
  openModal(event: MouseEvent) {
    event.preventDefault();
    this.modalService.toggleModal('auth');
  }
  async logout(event: MouseEvent) {
    event.preventDefault();
    await this.authService.logout();
  }
}
