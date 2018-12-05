import { Injectable } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class UserService {
  status: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  constructor(private _localStorage: LocalStorageService) { this.status.next(this.getUser() != null); }
  setUser = (user) => {
    if (user) {
      this._localStorage.set('user', user);
      //this._localStorage.set('token',JSON.stringify(user.token));
      this.status.next(true);
    } else {
      this._localStorage.remove('user');
     // this._localStorage.remove('token');
      this.status.next(false);
    }
  }

  getUser = () => this._localStorage.get('user');
  //getToken = () => this._localStorage.get('token');
  removeUser = () => this.setUser(null);
}
