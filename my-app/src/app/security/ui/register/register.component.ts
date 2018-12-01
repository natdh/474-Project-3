import { Component, OnInit } from '@angular/core';
import { SecurityService } from './../../services/security.service';

@Component({
  selector: 'app-security-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private email: string;
  private password: string ;

  constructor(private _secSvc: SecurityService) { this.email = this.password = ''; }

  registerClick = () => {
    this._secSvc.register(this.email, this.password, 'test-app').subscribe(
      data => console.log('Data:' + data),
      err => console.log(err)
    );
  }

  ngOnInit() {
  }
}