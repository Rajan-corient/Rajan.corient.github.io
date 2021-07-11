import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { IRegister } from './model/register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn:boolean = false;
  clicked = false;
  user:any = {};

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
    this.user = this.authService.loggedInUser;
  }

  logout () {
    localStorage.removeItem('loggedInUser');
    this.authService.logout();
  }

}
