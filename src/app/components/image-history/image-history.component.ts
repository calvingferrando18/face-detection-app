import { Component, inject, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store, select } from "@ngrx/store";
import {
  selectFaceDetectionHistory,
} from "../../store/face-detection/face-detection.selectors";
import { TFaceDetails, TFaceDetectionResult, TFaceRectangle } from "../../types/face-detection.types";
import { TOriginalImageDimensions } from "../../types/dimension-types";
import { ImagePreviewComponent } from "../../shared/components/image-preview/image-preview.component";

@Component({
  selector: 'app-image-history',
  standalone: true,
  imports: [CommonModule, ImagePreviewComponent],
  templateUrl: './image-history.component.html',
  styleUrls: ['./image-history.component.scss'],
})
export class ImageHistoryComponent {
  @ViewChild(ImagePreviewComponent) imagePreview!: ImagePreviewComponent;
  private readonly store: Store = inject(Store);
  history$ = this.store.pipe(select(selectFaceDetectionHistory));
  selectedImage: { image: string; result: TFaceDetectionResult } | null = null;
  faceRectangle: TFaceRectangle | null = null;
  originalImageDimensions: TOriginalImageDimensions | null = null;
  faceDetails: TFaceDetails | null = null;

  onPreview(item: { image: string; result: TFaceDetectionResult }) {
    const result = item.result.results[0];
    this.selectedImage = item;
    this.faceRectangle = result?.rectangle;
    this.faceDetails = {
      age: result?.age,
      ageRange: `${result?.ageLow}-${result?.ageHigh}`,
      gender: result?.gender,
    };
    const img = new Image();
    img.onload = () => {
      this.originalImageDimensions = {
        width: img.width,
        height: img.height,
      };
      this.imagePreview.updateRectanglePosition();
    };
    img.src = item.image;
  }
}
