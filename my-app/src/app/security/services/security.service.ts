import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SecurityService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private _http: Http, private _userSvc: UserService) { }

  public login(userName: string, password: string, client: string) {
    return this._http.post('http://localhost:3000/api/auth/login', 
      { email: userName, password: password, clientid: client },
      { headers: this.headers })
      .map(user => {
        this._userSvc.setUser(user.json());
        return user.json();
      });
  }

  public register(userName: string, password: string, firstName: string, lastName: string, client: string) {
    return this._http.post('http://localhost:3000/api/auth/register',
      {email: userName, password: password, firstName: firstName, lastName: lastName, clientid: client },
      {headers: this.headers })
      .map(user => {
        this._userSvc.setUser(user.json());
        return user.json();
      });
  }

  public createList(client: string, listName: string, listDesc: string, tasksList: Array<string>){
    //this.headers.append("Authorization",/*token*/);
    return this._http.post('http://localhost:3000/api/home/list',
    {name: listName, desc: listDesc, clientid: client, tasks: tasksList},
    {headers:this.headers})
  }


  public logout() {
    this._userSvc.removeUser();
  }

  public googleLogin() {
      const x = 1;
  }
  public googleLogout() {}
}
