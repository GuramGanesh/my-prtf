import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobExperience, Education } from '../configuration';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  _jobs:any;
  constructor() { 
    this._jobs=JobExperience;
  }

calculateYearsofExperience(startDate: string, endDate: string): string {
  // Convert the date string to a Date object Format 31/10/1999
  const start = new Date(startDate.split('/').reverse().join('-'));

  if(endDate === 'Present') {
    // If the end date is 'Present', use the current date
    const today = new Date();
    endDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  }

  const end = new Date(endDate.split('/').reverse().join('-'));

  // Calculate the difference in milliseconds
  const diffInMs = end.getTime() - start.getTime();

  // Calculate total months difference
  const totalMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.4375); // Average days in a month

  const years = Math.floor(totalMonths / 12); // Extract years
  const months = Math.round(totalMonths % 12); // Extract remaining months

  if(years === 0) {
    return `${months} Months`; // Return formatted string
  } else if(months === 0) {
    return `${years} Years`; // Return formatted string
  }
  // If both years and months are present, return formatted string
  return `${years} Years ${months} Months`; // Return formatted string
}
}