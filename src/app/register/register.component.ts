import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  userList:any = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userId: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  // isFieldInvalid(field: string) {
  //   return (
  //     (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
  //     (this.loginForm.get(field).untouched && this.formSubmitAttempt)
  //   );
  // }

  onRegister() {
    if (this.registerForm.valid) {
      let userObj = this.registerForm.getRawValue();
      this.userList.push(userObj)
      localStorage.setItem('userList', JSON.stringify(this.userList));
      this.registerForm.reset();
    }
  }

}
