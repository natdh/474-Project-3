import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SecurityService } from '../../security/services/security.service';
import { UserService } from '../../security/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  private isCreateListVisible = false;
  private name: string;
  private desc: string;
  private tasks: Array<string>;
  constructor(private _secSvc: SecurityService, private _userSvc: UserService) { this.name = this.desc = ''; }

  getUserLists = () => {
    lists: [] = this._userSvc.getUser()[1].lists;
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

  ngOnInit() {
  }


}
