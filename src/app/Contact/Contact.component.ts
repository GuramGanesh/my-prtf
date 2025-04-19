import { Configuration } from './../configuration';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Contact',
  imports: [CommonModule],
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class ContactComponent {

  _userAddress:string;
  _userPhone:string;
  _userEmail:string;
  constructor() {
    this._userAddress=Configuration.userAddress;
    this._userPhone=Configuration.userPhone;
    this._userEmail=Configuration.userEmail;
  }
}