import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false;
  alertMsg = 'Por favor, aguarde! realizando o login.';
  alertColor = 'blue';
  login(): void {
    this.showAlert = true;
    this.alertMsg = 'Por favor, aguarde! realizando o login.';
    this.alertColor = 'blue';
  }
}
