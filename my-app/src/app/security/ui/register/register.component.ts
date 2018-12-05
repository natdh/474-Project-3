import { Component, OnInit } from '@angular/core';
import { SecurityService } from './../../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private email: string;
  private password: string;
  private firstName: string;
  private lastName: string

  constructor(private router: Router, private _secSvc: SecurityService) { this.email = this.password = this.firstName = this.lastName = ''; }

  registerClick = () => {
    this._secSvc.register(this.email, this.password, this.firstName, this.lastName, 'my-app').subscribe(
      data => console.log('Data:' + data),
      err => console.log(err)
    );
    this.router.navigateByUrl('/home');    
  }

  ngOnInit() {
  }
}