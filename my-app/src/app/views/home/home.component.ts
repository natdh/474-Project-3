import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SecurityService } from '../../security/services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
loggedIn = false;
  private name: string;
  private desc: string;
  private tasks: Array<string>;
  constructor(private _secSvc: SecurityService) { this.name = this.desc = ''; }

  newList = () => {
    this._secSvc.createList('my-app', this.name, this.desc, this.tasks).subscribe(
      data => console.log('Data:' + data),
      err => console.log(err)
    );
  }

  ngOnInit() {
  }


}
