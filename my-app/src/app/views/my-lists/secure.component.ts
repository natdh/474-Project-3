import { Component, OnInit } from '@angular/core';
import { SecurityComponent} from '../../security/classes/security.component';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent extends SecurityComponent implements OnInit {
  private isCreateListVisible = false;

  constructor() {
    super(['User']);
  }

  newList = () => {
    
  }

  ngOnInit() {
  }

}
