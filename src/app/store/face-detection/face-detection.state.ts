import { TFaceDetectionResult } from '../../types/face-detection.types';

export type FaceDetectionState = {
  result: TFaceDetectionResult | null;
  loading: boolean;
  error: string | null;
  history: Array<{ result: TFaceDetectionResult; image: string }>;
};

export const initialState: FaceDetectionState = {
  result: null,
  loading: false,
  error: null,
  history: [],
};
