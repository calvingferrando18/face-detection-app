import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

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

    return {
      left: this.faceRectangle.left * scaleX,
      top: this.faceRectangle.top * scaleY,
      right: this.faceRectangle.right * scaleX,
      bottom: this.faceRectangle.bottom * scaleY,
    };
  }

  updateRectanglePosition() {
    if (this.faceRectangle) {
      this.faceRectangle = { ...this.faceRectangle };
      this.cdr.detectChanges();
    }
  }
}
