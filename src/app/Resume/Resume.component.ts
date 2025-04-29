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
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.mjs';

    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      this.pdfContainer.nativeElement.innerHTML = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: this.currentScale });

        // Create container for each page
        const pageContainer = document.createElement('div');
        pageContainer.style.position = 'relative';
        pageContainer.style.marginBottom = '10px';

        // Render canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        // Create text layer
        const textLayerDiv = document.createElement('div');
        textLayerDiv.className = 'textLayer';
        textLayerDiv.style.position = 'absolute';
        textLayerDiv.style.top = '0';
        textLayerDiv.style.left = '0';
        textLayerDiv.style.width = `${viewport.width}px`;
        textLayerDiv.style.height = `${viewport.height}px`;

        // Append canvas and text layer to page container
        pageContainer.appendChild(canvas);
        pageContainer.appendChild(textLayerDiv);
        this.pdfContainer.nativeElement.appendChild(pageContainer);

        // Render text layer
        const textContent = await page.getTextContent();
        pdfjsLib.renderTextLayer({
          textContent,
          container: textLayerDiv,
          viewport,
          textDivs: [],
        }).promise;
      }
    } catch (error) {
      console.error('Error rendering PDF:', error);
    }
  }

  zoomIn() {
    this.currentScale = Math.min(this.currentScale + 0.1, 2.5);
    this.renderPDF(this._resumeLink);
  }

  zoomOut() {
    this.currentScale = Math.max(this.currentScale - 0.1, 0.8);
    this.renderPDF(this._resumeLink);
  }
}