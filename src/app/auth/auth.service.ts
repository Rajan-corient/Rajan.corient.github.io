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

  get userList():IRegister[] {
    return JSON.parse(localStorage.getItem('userList') || '{}');
  }

  get loggedInUser():IRegister {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  constructor(
    private router: Router
  ) { }

  login(user: IUser) {
    let currentUser:any = this.userList.find(item => item.userId == user.userId && item.password == user.password);
    if (currentUser.userId && currentUser.password) {
      localStorage.setItem('loggedInUser', JSON.stringify(currentUser))
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
