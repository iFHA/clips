import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(
    public readonly modalService: ModalService,
    public readonly authService: AuthService
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
