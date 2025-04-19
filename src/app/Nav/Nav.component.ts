import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-Nav',
  imports: [CommonModule,RouterModule],
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.scss']
})
export class NavComponent {}