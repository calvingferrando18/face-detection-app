import { createReducer, on } from '@ngrx/store';
import {
  detectFace,
  detectFaceFailure,
  detectFaceSuccess,
} from './face-detection.actions';
import { initialState } from './face-detection.state';

export const faceDetectionReducer = createReducer(
  initialState,
  on(detectFace, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(detectFaceSuccess, (state, { image, result }) => ({
    ...state,
    result,
    history: [...state.history, { result, image }],
    loading: false,
  })),
  on(detectFaceFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
