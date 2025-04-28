import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { db } from './firebase.config';
import { collection, addDoc } from "firebase/firestore";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class ContactComponent {
  fullName: string = '';
  email: string = '';
  linkToSocialMedia: string = '';
  message: string = '';
  submissionSuccess: boolean = false; // Add a flag for success message
  submissionError: boolean = false;   // Add a flag for error message

  constructor() {}

  async onSubmit() {
    const formData = {
      fullName: this.fullName,
      email: this.email,
      linkToSocialMedia: this.linkToSocialMedia,
      message: this.message
    };

    try {
      const docRef = await addDoc(collection(db, "formData"), formData);
      console.log("Document written with ID: ", docRef.id);
      this.submissionSuccess = true; // Set success flag
      this.submissionError = false;  // Reset error flag
      // Optionally reset the form after successful submission
      this.fullName = '';
      this.email = '';
      this.linkToSocialMedia = '';
      this.message = '';
      // Optionally hide the success message after a few seconds
      setTimeout(() => {
        this.submissionSuccess = false;
      }, 3000);
    } catch (e) {
      console.error("Error adding document: ", e);
      this.submissionSuccess = false; // Reset success flag
      this.submissionError = true;   // Set error flag
      // Optionally hide the error message after a few seconds
      setTimeout(() => {
        this.submissionError = false;
      }, 3000);
    }
  }
}