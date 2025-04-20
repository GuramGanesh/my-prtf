import { Component } from '@angular/core';
import { Projects } from '../configuration';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
   _projects:any;
   isVideoPopupVisible:any=false;
    constructor() { 
      this._projects=Projects;
    }

    openVideoPopup(videoUrl: string) {
      this.isVideoPopupVisible = true;
      const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
      if (videoElement) {
        videoElement.pause();
        videoElement.src = this.getDriveDirectLink(videoUrl);
        videoElement.load();
        videoElement.play();
      }
    }    
    closeVideoPopup() {
      this.isVideoPopupVisible = false;
      const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
      if (videoElement) {
        videoElement.pause();
        videoElement.src = '';
      }
    }

    private getDriveDirectLink(url: string): string {
      const match = url.match(/\/file\/d\/([^\/]+)\//);
      return match ? `https://drive.google.com/uc?id=${match[1]}&export=download` : url;
    }
}