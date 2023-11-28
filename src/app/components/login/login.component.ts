import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupaService } from 'src/app/services/supa.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  invalidCredentials: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private auth: SupaService,
     private router: Router,
     private coreService: CoreService) {
    this.loginForm = this.formBuilder.group({
      email: formBuilder.control('',
        [Validators.required,
        Validators.email]),
      password: formBuilder.control('',
        [Validators.required])
    });
  }

  public onSubmit() {
    this.auth.signIn(this.loginForm.value.email,
      this.loginForm.value.password)
      .then(async (res) => {
        console.log(res);
        if (res.data.user!.role === "authenticated") {
          await this.getUserDetailsAndNavigate();
          this.coreService.openSnackBar('Login successful');
        }
      })
      .catch((err) => {
        console.log(err);
        this.invalidCredentials = true;
      });
  }

  private async getUserDetailsAndNavigate() {

    const userDetails = await this.auth.getUserDetails();

    if (userDetails) {
      console.log(userDetails);
      this.router.navigate(['/dashboard']);
    } else {

    }
  }
}





