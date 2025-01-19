import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FaceDetectionState } from './face-detection.state';

export const selectFaceDetectionState =
  createFeatureSelector<FaceDetectionState>('faceDetection');

export const selectTFaceDetectionResult = createSelector(
  selectFaceDetectionState,
  (state) => state.history.length > 0 && state.history[state.history.length - 1].result || null
);

export const selectFaceDetectionLoading = createSelector(
  selectFaceDetectionState,
  (state) => state.loading
);

export const selectFaceDetectionError = createSelector(
  selectFaceDetectionState,
  (state) => state.error
);

export const selectFaceDetectionHistory = createSelector(
  selectFaceDetectionState,
  (state) => state.history
);
