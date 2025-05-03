import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { resumeLink } from '../configuration';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-resume',
  templateUrl: './Resume.component.html',
  styleUrls: ['./Resume.component.css'],
})
export class ResumeComponent implements AfterViewInit {
  _resumeLink: string = resumeLink;
  currentScale = 1.3;
  
  @ViewChild('pdfContainer', { static: false }) 
  pdfContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.renderPDF(this._resumeLink);
  }

  async renderPDF(pdfUrl: string) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '../assets/pdf.worker.mjs';

    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      this.pdfContainer.nativeElement.innerHTML = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: this.currentScale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        this.pdfContainer.nativeElement.appendChild(canvas);
      }
    } catch (error) {
      console.error('Error rendering PDF:', error);
    }
  }

  // Add zoom functionality
  zoomIn() {
    this.currentScale = Math.min(this.currentScale + 0.1, 2.5);
    this.renderPDF(this._resumeLink);
  }

  zoomOut() {
    this.currentScale = Math.max(this.currentScale - 0.1, 0.8);
    this.renderPDF(this._resumeLink);
  }
}