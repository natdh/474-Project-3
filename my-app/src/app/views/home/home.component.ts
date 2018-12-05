import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SecurityService } from '../../security/services/security.service';
import { ListService } from '../../lists/list.service';
import { Input } from '@angular/core/src/metadata/directives';

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
  private task: string;
  private details: string;
  private dueDate: string;
  private listid: string;
  private desc: string;
  private tasks: Array<string>;
  constructor(private _secSvc: SecurityService) { this.name = this.desc = ''; }

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

  clear(){
    this.task = ''; // null should work too, but as the type ov the value is string I like to use ''
  }

  ngOnInit() {
  }

}
