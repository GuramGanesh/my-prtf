import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { resumeLink } from '../configuration'; // Assuming this path is correct
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api'; // Import types
import { CommonModule } from '@angular/common';

// Define the type for the PDF worker entry point
type PdfJsWorkerEntryType = string | { url: string };

@Component({
  selector: 'app-resume',
  templateUrl: './Resume.component.html', // Assumes you have this file
  styleUrls: ['./Resume.component.css'],   // Assumes you have this file
  imports: [CommonModule]
})
export class ResumeComponent implements AfterViewInit, OnDestroy {
  // --- Configuration ---
  _resumeLink: string = resumeLink; // Link to your PDF file
  // pdfWorkerSrc: PdfJsWorkerEntryType = '../assets/pdf.worker.mjs'; // Adjust path if needed. Common paths: 'pdf.worker.js', 'assets/pdf.worker.js', node_modules/pdfjs-dist/build/pdf.worker.js'

  // --- State ---
  currentScale: number = 5.0; // Initial scale, will be adjusted
  pdfDoc: PDFDocumentProxy | null = null; // Store the loaded PDF document
  isLoading: boolean = true; // Flag for loading state
  renderTaskRunning: boolean = false; // Flag to prevent concurrent rendering


  // --- Constants ---
  readonly MIN_SCALE = 3.0;
  readonly MAX_SCALE = 5.0;
  readonly SCALE_STEP = 0.2;
  readonly RESIZE_DEBOUNCE_TIME = 150; // milliseconds

  // --- Element References ---
  @ViewChild('pdfContainer', { static: true }) pdfContainer!: ElementRef<HTMLDivElement>;

  // --- Private Properties ---
  private resizeTimeout: any; // For debouncing resize events
  private isViewInitialized = false; // Track if AfterViewInit has run

  constructor(private cdr: ChangeDetectorRef) {
    // Set the worker source for pdf.js
    // Make sure the worker file is copied to your assets folder during the build process (angular.json)
    pdfjsLib.GlobalWorkerOptions.workerSrc = '../assets/pdf.worker.mjs';
  }

  // --- Lifecycle Hooks ---

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    console.log('View initialized. Loading PDF...');
    this.loadAndRenderPdf(); // Initial load and render
  }

  ngOnDestroy(): void {
    // Clean up resources
    if (this.pdfDoc) {
      this.pdfDoc.destroy();
    }
    clearTimeout(this.resizeTimeout); // Clear any pending resize handler
  }

  // --- Event Listeners ---

  @HostListener('window:resize')
  onResize(): void {
    // Debounce the resize event to avoid excessive re-rendering
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.isViewInitialized && this.pdfDoc) { // Ensure view is ready and PDF is loaded
        console.log('Window resized, adjusting scale and re-rendering...');
        this.adjustScaleToFitWidthAndRender();
      }
    }, this.RESIZE_DEBOUNCE_TIME);
  }

  // --- PDF Loading and Rendering ---

  async loadAndRenderPdf(): Promise<void> {
    if (!this.isViewInitialized) {
      console.warn('View not initialized yet, skipping PDF load.');
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges(); // Update view to show loading state

    try {
      console.log(`Attempting to load PDF from: ${this._resumeLink}`);
      const loadingTask = pdfjsLib.getDocument(this._resumeLink);
      this.pdfDoc = await loadingTask.promise;
      console.log(`PDF loaded successfully with ${this.pdfDoc.numPages} pages.`);
      this.adjustScaleToFitWidthAndRender(); // Calculate initial scale and render
    } catch (error) {
      console.error('Error loading PDF:', error);
      // Optionally display an error message to the user in the template
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); // Update view to hide loading state
    }
  }

  async adjustScaleToFitWidthAndRender(): Promise<void> {
    if (!this.pdfDoc || !this.pdfContainer || this.renderTaskRunning) {
      console.log('PDF document or container not ready, or render task running. Skipping scale adjustment.');
      return;
    }

    const containerWidth = this.pdfContainer.nativeElement.offsetWidth;
    if (containerWidth <= 0) {
      console.warn('Container width is 0. Retrying scale adjustment shortly...');
      // Retry after a short delay if container width isn't available yet
      setTimeout(() => this.adjustScaleToFitWidthAndRender(), 50);
      return;
    }

    try {
      // Get the first page to determine the base width
      const page: PDFPageProxy = await this.pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: 5.0 }); // Get viewport at scale 1.0
      const pdfBaseWidth = viewport.width;

      // Calculate the scale needed to fit the PDF width to the container width
      this.currentScale = containerWidth / pdfBaseWidth;
      // Clamp the scale within defined limits
      this.currentScale = Math.max(this.MIN_SCALE, Math.min(this.currentScale, this.MAX_SCALE));

      console.log(`Container width: ${containerWidth}, PDF base width: ${pdfBaseWidth}, Calculated scale: ${this.currentScale}`);

      // Now render all pages with the newly calculated scale
      await this.renderAllPages();

    } catch (error) {
      console.error('Error adjusting scale or getting page:', error);
    }
  }


  async renderAllPages(): Promise<void> {
     if (!this.pdfDoc || !this.pdfContainer || this.renderTaskRunning) {
        console.log('PDF document or container not ready, or render task running. Skipping render.');
        return;
     }

     this.renderTaskRunning = true;
     console.log(`Rendering PDF pages with scale: ${this.currentScale}`);

     // Clear previous content
     this.pdfContainer.nativeElement.innerHTML = '';
     // Create a document fragment to batch appendChild calls for better performance
     const fragment = document.createDocumentFragment();

     try {
        for (let pageNum = 1; pageNum <= this.pdfDoc.numPages; pageNum++) {
           const page: PDFPageProxy = await this.pdfDoc.getPage(pageNum);
           const viewport = page.getViewport({ scale: this.currentScale });

           // Create canvas for the page
           const canvas = document.createElement('canvas');
           const context = canvas.getContext('2d');
           if (!context) {
              console.error(`Could not get 2D context for canvas on page ${pageNum}`);
              continue; // Skip this page if context fails
           }
           canvas.height = viewport.height;
           canvas.width = viewport.width;
            // Add styles directly or via CSS class for consistency
           canvas.style.display = 'block'; // Ensure canvas takes block layout
           canvas.style.maxWidth = '100%'; // Ensure canvas doesn't overflow container
           canvas.style.height = 'auto';   // Maintain aspect ratio
           canvas.style.margin = '10px auto'; // Center canvas and add some margin
           canvas.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; // Apply shadow

           // Append canvas to the fragment
           fragment.appendChild(canvas);

           // Render page content onto the canvas
           const renderContext = {
              canvasContext: context,
              viewport: viewport
           };
           await page.render(renderContext).promise;
           console.log(`Page ${pageNum} rendered.`);
        }
        // Append all canvases at once to the DOM
        this.pdfContainer.nativeElement.appendChild(fragment);
        console.log('All pages appended to container.');

     } catch (error) {
        console.error('Error rendering PDF pages:', error);
     } finally {
        this.renderTaskRunning = false;
        this.cdr.detectChanges(); // Ensure view updates after rendering
     }
  }


  // --- Zoom Functionality ---

  zoomIn(): void {
    if (this.renderTaskRunning || !this.pdfDoc) return; // Prevent zoom during render or if no PDF
    const newScale = this.currentScale + this.SCALE_STEP;
    this.currentScale = Math.min(newScale, this.MAX_SCALE); // Apply upper limit
    console.log(`Zooming in to scale: ${this.currentScale}`);
    this.renderAllPages(); // Re-render with the new scale
  }

  zoomOut(): void {
    if (this.renderTaskRunning || !this.pdfDoc) return; // Prevent zoom during render or if no PDF
    const newScale = this.currentScale - this.SCALE_STEP;
    this.currentScale = Math.max(newScale, this.MIN_SCALE); // Apply lower limit
    console.log(`Zooming out to scale: ${this.currentScale}`);
    this.renderAllPages(); // Re-render with the new scale
  }
}