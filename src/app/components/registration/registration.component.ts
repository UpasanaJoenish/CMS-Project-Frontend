import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SupaService } from 'src/app/services/supa.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: SupaService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: this.formBuilder.control('',
        [Validators.required, 
          Validators.minLength(2),
           Validators.maxLength(20)]),
      email: this.formBuilder.control('',
        [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/[a-zA-Z]/),
        Validators.pattern(/\d/),
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/),
      ]),
      confirmPassword: this.formBuilder.control('', [Validators.required])
    }, { validators: [this.passwordMatchValidator] });
  }

  public onSubmit() {
    const { name, email, password } = this.registerForm.value;

    this.auth.signUpAndInsertUserData(name, email, password)
      .then((res) => {
        console.log(res);

        if (res.data.user!.role === 'authenticated') {
          this.router.navigate(['/login']);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

}


