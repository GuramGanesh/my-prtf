import { Component } from '@angular/core';

import { achievements } from '../configuration';

@Component({
  selector: 'app-achievements',
  imports: [],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {
  _achievements:any;
  constructor() {
    this._achievements=achievements;
  }
}