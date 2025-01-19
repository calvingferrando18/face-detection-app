import { createAction, props } from '@ngrx/store';
import { TFaceDetectionResult } from '../../types/face-detection.types';

export const detectFace = createAction(
  '[Face Detection] Detect Face',
  props<{ image: string }>()
);

export const detectFaceSuccess = createAction(
  '[Face Detection] Detect Face Success',
  props<{ image: string; result: TFaceDetectionResult }>()
);

export const detectFaceFailure = createAction(
  '[Face Detection] Detect Face Failure',
  props<{ error: string }>()
);
