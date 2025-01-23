import { TFaceDetectionResult } from '../../types/face-detection.types';

export type FaceDetectionState = {
  loading: boolean;
  error: string | null;
  history: Array<{ result: TFaceDetectionResult; image: string }>;
};

export const initialState: FaceDetectionState = {
  loading: false,
  error: null,
  history: [],
};
