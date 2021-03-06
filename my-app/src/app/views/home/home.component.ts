import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SecurityService } from '../../security/services/security.service';
import { Input } from '@angular/core/src/metadata/directives';
import { UserService } from '../../security/services/user.service';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  private isCreateListVisible = false;
  private isListDataVisible = false;
  private lists: Array<Object>;
  private taskDetails: string; 
  private taskName: string; 
  private name: string;
  private task: string;
  private details: string;
  private dueDate: string;
  private listid: string;
  private desc: string;
  private tasks: Array<string>;
  private listIds: Array<any>;
  private listTasks: Array<Array<Object>>;
  constructor(private _secSvc: SecurityService, private _userSvc: UserService) { this.name = this.desc = ''; }

  getUserListIds = () => {
    this._secSvc.updateLocalUser();
    let i = 0;
    this.listIds = new Array();
    JSON.parse(this._userSvc.getUser()['user']['lists']).forEach(element => {
      this.listIds[i]=element['_id'];
      i=i+1;
    });
    this.listid = this.listIds[i-1];
    //console.log(this.listid);
  }

  fillListTasks = () => {
    let i=0;
    this.listTasks = new Array();
    JSON.parse(this._userSvc.getUser()['user']['lists']).forEach(element => {
      let j=0;
      this.listTasks[i] = new Array();
      element['tasks'].forEach(task => {
        this.listTasks[i][j]=task;
        j=j+1;
      });
      i=i+1;
    });
  }

  logInput = (input: string) => {
    console.log(input);
  }

  updateLocalUser = () =>{
    this._secSvc.updateLocalUser();
  }

  getUserLists = () =>{
    let i = 0;
    this.lists = new Array();
    JSON.parse(this._userSvc.getUser()['user']['lists']).forEach(element => {
      this.lists[i]=element;
      i=i+1;
    });
    console.log(this.lists);
  }

  logLists() {
    console.log(JSON.parse(this._userSvc.getUser()['user']['lists']));//5c0822eac4df9937ac2a08aa
  }

  logUser() {
    console.log(this._userSvc.getUser());
  }

  newList = () => {
    this._secSvc.createList('my-app', this.name, this.desc, this.tasks).subscribe(
      data => console.log('Data:' + data),
      err => console.log(err)
    );
    this.name = '';
    this.desc = '';
  }

  newTask = () => {
    console.log(this.listid);
    //console.log(JSON.parse(this._secSvc.getList('my-app',)));
    this._secSvc.createTask('my-app', this.taskName, this.taskDetails, this.listid /*NEEDS TO BE CURRENT LIST ID BUT
      PUTTING THIS HERE SO IT DOESNT BREAK EVERYTHING*/, this.dueDate).subscribe(
      data => console.log('Data:' + data),
      err => console.log(err)
    );
    console.log()
    this.taskDetails = '';
    this.taskName = '';
  }

  ngOnInit() {
    /*
    let i = 0;
    this.lists = new Array();
    JSON.parse(this._userSvc.getUser()['user']['lists']).forEach(element => {
      this.lists[i]=element;
      i=i+1;
    });*/
  }

}
