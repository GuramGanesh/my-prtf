import { SocialMedia } from './../configuration';
import { Component } from '@angular/core';
import { Configuration } from '../configuration';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Profile',
  imports: [CommonModule],
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent {

  _profileUrl:string;
  _userName:string;
  _userJob:string;
  _userLocation:string;
  _userEmail:string;
  _userDateOfBirth:string;
  _github:string;
  _linkedin:string;
  _twitter:string;
  _medium:string;
  constructor() { 
    this._profileUrl=Configuration.profileUrl;
    this._github=SocialMedia.github;
    this._twitter=SocialMedia.X;
    this._linkedin=SocialMedia.linkedin;
    this._medium=SocialMedia.medium;
    this._userName=Configuration.userName;
    this._userJob=Configuration.userJob;
    this._userLocation=Configuration.userLocation;
    this._userDateOfBirth=Configuration.userDateOfBirth;
    this._userEmail=Configuration.userEmail;
  }
}