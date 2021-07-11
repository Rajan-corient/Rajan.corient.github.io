import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IRegister } from '../model/register';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userList():any {
    return JSON.parse(localStorage.getItem('userList') || '{}');
  }

  constructor(
    private router: Router
  ) { }

  login(user: IUser) {
    if (user.userName !== '' && user.password !== '') {
      const users = this.userList;
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
