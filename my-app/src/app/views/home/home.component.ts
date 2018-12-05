import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SecurityService } from '../../security/services/security.service';
import { UserService } from '../../security/services/user.service';
import {LocalStorageService} from 'angular-2-local-storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  private isCreateListVisible = false;
  private isListDataVisible = false;
  private name: string;
  private details: string;
  private dueDate: string;
  private listid: string;
  private desc: string;
  private tasks: Array<string>;
  private lists: [];
  constructor(private _secSvc: SecurityService, private _userSvc: UserService, private _localStorage: LocalStorageService) { this.name = this.desc = ''; }

  getUserLists = () => {
    //this.lists = this._localStorage.get('lists');
    //console.log(this.lists);
    //this._userSvc.getUser().json()['user'].lists.forEach(function(item){item.forEach(function(inner){console.log(inner);})});
    console.log(this._userSvc.getUser()['user']['lists']);
  }

  logLists() {
    console.log(this._userSvc.getUser()[1]);
  }

  logUser() {
    console.log(this._userSvc.getUser());

  }

  newList = () => {
    this._secSvc.createList('my-app', this.name, this.desc, this.tasks).subscribe(
      data => console.log('Data:' + data),
      err => console.log(err)
    );
  }

  newTask = () => {
    this._secSvc.createTask('my-app', this.name, this.details, this.listid, this.dueDate).subscribe(
      data => console.log('Data:' + data),
      err => console.log(err)
    );
  }

  ngOnInit() {
  }


}
