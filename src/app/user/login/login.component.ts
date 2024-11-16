import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../alert/alert.component';
import { AuthService } from '../../services/auth.service';

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
  inSubmission = false;
  alertMsg = 'Por favor, aguarde! realizando o login.';
  alertColor = 'blue';

  constructor(public auth: AuthService) {
  }

  async login(): Promise<void> {
    this.showAlert = true;
    this.inSubmission = true;
    this.alertMsg = 'Por favor, aguarde! realizando o login.';
    this.alertColor = 'blue';
    try{
      await this.auth.login(this.credentials.email, this.credentials.password);
      this.alertMsg = 'Login realizado com sucesso!';
      this.alertColor = 'green';
      this.inSubmission = false;
    } catch(e) {
      this.alertMsg = 'Erro ao realizar o login!';
      this.alertColor = 'red';
      this.inSubmission = false;
      console.error(e);
      return;
    }
  }
}
