import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TFaceDetails, TFaceRectangle } from '../../../types/face-detection.types';
import { TOriginalImageDimensions } from '../../../types/dimension-types';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit, OnDestroy {
  @ViewChild('previewImage') previewImage!: ElementRef<HTMLImageElement>;

  @Input({ required: true }) imageUrl: string | null = null;
  @Input({ required: true })
  originalImageDimensions: TOriginalImageDimensions | null = null;
  @Input({ required: true }) faceRectangle: TFaceRectangle | null = null;
  @Input({ required: true }) faceDetails: TFaceDetails | null = null;

  private resizeListener: (() => void) | null = null;
  private scaledRectangle: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  } | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.resizeListener = () => this.updateRectanglePosition();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }
  }

  getScaledRectangle() {
    if (this.scaledRectangle) {
      return this.scaledRectangle;
    }

    if (
      !this.faceRectangle ||
      !this.originalImageDimensions ||
      !this.previewImage
    ) {
      return null;
    }

    const displayedWidth = this.previewImage.nativeElement.clientWidth;
    const displayedHeight = this.previewImage.nativeElement.clientHeight;

    const scaleX = displayedWidth / this.originalImageDimensions.width;
    const scaleY = displayedHeight / this.originalImageDimensions.height;

    this.scaledRectangle = {
      left: this.faceRectangle.left * scaleX,
      top: this.faceRectangle.top * scaleY,
      right: this.faceRectangle.right * scaleX,
      bottom: this.faceRectangle.bottom * scaleY,
    };

    return this.scaledRectangle;
  }

  updateRectanglePosition() {
    if (this.faceRectangle) {
      this.ngZone.run(() => {
        this.scaledRectangle = null; // Force recalculation
        this.faceRectangle = { ...this.faceRectangle! };
      });
    }
  }
}
