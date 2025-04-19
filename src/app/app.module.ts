import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutComponent } from './About/About.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './appRoutes';
import { ProfileComponent } from './Profile/Profile.component';
import { NavComponent } from './Nav/Nav.component';
import { ContactComponent } from './Contact/Contact.component';
import { ResumeComponent } from './Resume/Resume.component';

@NgModule({
  declarations: [
   ],
  imports: [
    AppComponent,BrowserModule,
    RouterModule.forRoot(AppRoutes),ProfileComponent,NavComponent,
    ContactComponent,ResumeComponent,AboutComponent],
    providers: [],
    bootstrap: []
})
export class AppModule { }
