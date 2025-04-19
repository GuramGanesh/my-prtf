import { ResumeComponent } from './Resume/Resume.component';
import { ContactComponent } from './Contact/Contact.component';
import { AboutComponent } from './About/About.component';
import { Routes } from '@angular/router';

export const AppRoutes:Routes =[
    {path:"about" , component:AboutComponent},
    {path:"contact" , component:ContactComponent},
    {path:"resume" , component:ResumeComponent},
    {path:"**",component:AboutComponent,pathMatch:"full"},
]
