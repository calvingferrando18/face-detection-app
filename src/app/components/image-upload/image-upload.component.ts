import { AfterViewInit, Component, inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { detectFace } from '../../store/face-detection/face-detection.actions';
import { selectFaceDetectionError, selectFaceDetectionLoading, selectTFaceDetectionResult } from '../../store/face-detection/face-detection.selectors';
import { ImagePreviewComponent } from '../../shared/components/image-preview/image-preview.component';
import { TFaceDetails, TFaceRectangle } from '../../types/face-detection.types';
import { TOriginalImageDimensions } from '../../types/dimension-types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ImagePreviewComponent],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly ngZone = inject(NgZone);
  @ViewChild(ImagePreviewComponent) imagePreview!: ImagePreviewComponent;
  imageUrl: string | null = null;
  selectedFile: File | null = null;
  faceRectangle: TFaceRectangle | null = null;
  originalImageDimensions: TOriginalImageDimensions | null = null;
  faceDetails: TFaceDetails | null = null;
  loading$ = this.store.select(selectFaceDetectionLoading);
  error$ = this.store.select(selectFaceDetectionError);
  private faceDetectionSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.faceDetectionSubscription = this.store
      .select(selectTFaceDetectionResult)
      .subscribe((res) => {
        if (res && res.results && res.results.length > 0) {
          const result = res.results[0];
          this.ngZone.run(() => {
            this.faceRectangle = result.rectangle;
            this.faceDetails = {
              age: result.age,
              ageRange: `${result.ageLow}-${result.ageHigh}`,
              gender: result.gender,
            };
            // Only call updateRectanglePosition if imagePreview is available
            if (this.imagePreview) {
              this.imagePreview.updateRectanglePosition();
            }
          });
        }
      });
  }

  ngAfterViewInit(): void {
    // If we already have face detection results when the view is initialized
    if (this.faceRectangle && this.imagePreview) {
      this.imagePreview.updateRectanglePosition();
    }
  }

  ngOnDestroy(): void {
    if (this.faceDetectionSubscription) {
      this.faceDetectionSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;

        const img = new Image();
        img.onload = () => {
          this.originalImageDimensions = {
            width: img.width,
            height: img.height,
          };

          this.store.dispatch(
            detectFace({
              image: this.imageUrl as string,
            })
          );
        };
        img.src = this.imageUrl;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageUrl = null;
      this.selectedFile = null;
      this.faceRectangle = null;
      this.originalImageDimensions = null;
      this.faceDetails = null;
    }
  }
}
