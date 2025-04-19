import { Component, ViewEncapsulation } from '@angular/core';
import { NavComponent } from './Nav/Nav.component';
import { ProfileComponent } from './Profile/Profile.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileComponent, NavComponent,RouterModule], // Import standalone components
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'portfolio';
}
