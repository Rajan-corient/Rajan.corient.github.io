import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formSubmitAttempt = false;
  }

  ngOnInit() {
  }

  // isFieldInvalid(field: string) {
  //   return (
  //     (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
  //     (this.loginForm.get(field).untouched && this.formSubmitAttempt)
  //   );
  // }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
    this.formSubmitAttempt = true;
  }

}
