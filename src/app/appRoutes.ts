import { ResumeComponent } from './Resume/Resume.component';
import { ContactComponent } from './Contact/Contact.component';
import { AboutComponent } from './About/About.component';
import { Routes } from '@angular/router';
import { AchievementsComponent } from './achievements/achievements.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';

export const AppRoutes:Routes =[
    {path:"about" , component:AboutComponent},
    {path:"contact" , component:ContactComponent},
    {path:"project" , component:ProjectsComponent},
    {path:"experience" , component:ExperienceComponent},
    {path:"achievements" , component:AchievementsComponent},
    {path:"resume" , component:ResumeComponent},
    {path:"**",component:AboutComponent,pathMatch:"full"},
]
