import { Configuration, Skills } from './../configuration';
import { Component } from '@angular/core';



@Component({
  selector: 'app-about',
  imports: [], // Import CommonModule for *ngFor and *ngIf
  templateUrl: './About.component.html',
  styleUrls: ['./About.component.scss']
})
export class AboutComponent {

  aboutMe:string;
  skills:any;
  constructor() {
    this.aboutMe=Configuration.aboutMe; 
    this.skills=Skills;
  }

}