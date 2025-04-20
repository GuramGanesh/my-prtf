import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { achievements } from '../configuration';

@Component({
  selector: 'app-achievements',
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {
  _achievements:any;
  constructor() {
    this._achievements=achievements;
  }
}