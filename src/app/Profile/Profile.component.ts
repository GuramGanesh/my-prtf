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

calculateAge(arg0: string): number {
  // Convert the date string to a Date object Format 31/10/1999
  const [day, month, year] = arg0.split('/').map(Number);
  const dob = new Date(year, month - 1, day);
  const today = new Date();
  if (isNaN(dob.getTime())) {
    console.error('Invalid date format:', arg0);
    return NaN;
  }
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

  _profileUrl:string;
  _userName:string;
  _userJob:string;
  _userLocation:string;
  _userEmail:string;
  _userPhone:string;
  _userDateOfBirth:string;
  _github:string;
  _linkedin:string;
  _x:string;
  _medium:string;
  constructor() { 
    this._profileUrl=Configuration.profileUrl;
    this._github=SocialMedia.github;
    this._x=SocialMedia.X;
    this._linkedin=SocialMedia.linkedin;
    this._medium=SocialMedia.medium;
    this._userName=Configuration.userName;
    this._userJob=Configuration.userJob;
    this._userLocation=Configuration.userLocation;
    this._userDateOfBirth=Configuration.userDateOfBirth;
    this._userEmail=Configuration.userEmail;
    this._userPhone=Configuration.userPhone;
  }
}