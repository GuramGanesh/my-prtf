import { JobExperience, Education } from '../configuration';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Resume',
  imports: [CommonModule],
  templateUrl: './Resume.component.html',
  styleUrls: ['./Resume.component.css']
})
export class ResumeComponent {

  _jobs:any;
  _educations;
  constructor() { 
    this._jobs=JobExperience;
    this._educations=Education;
  }

}