import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AlertComponent } from '../../alert/alert.component';
import { InputComponent } from '../../input/input.component';
import { AuthService } from '../../services/auth.service';
import IUser from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    AlertComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Por favor, aguarde, sua conta está sendo criada.';
  alertColor = 'blue';
  registerForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    age: new FormControl<number|null>(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(120)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required
    ]),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(11)
    ])
  });

  constructor (
    private auth:AuthService
  ) {}

  async register(): Promise<void> {
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Por favor, aguarde! sua conta está sendo criada.';
    this.alertColor = 'blue';

    try {
      if(this.registerForm.valid) {
          const userCredentials = await this.auth.createUser(
            this.registerForm.value as IUser
          );
          this.alertMsg = 'Conta criada com sucesso!';
          this.alertColor = 'green';
      }
      this.inSubmission = false;
    } catch (e) {
      this.alertMsg = 'Erro ao criar a conta!';
      this.alertColor = 'red';
      console.error(e);
      this.inSubmission = false;
      return;
    }
  }
}
