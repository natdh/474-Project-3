import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SecurityService } from '../../security/services/security.service';
import { ListService } from '../../list.service';

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
  lists: List[];
  constructor(private _secSvc: SecurityService) { this.name = this.desc = ''; }

  ngOnInit() {
  }


}
