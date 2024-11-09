import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phoneNumber: new FormControl('')
  });
}
