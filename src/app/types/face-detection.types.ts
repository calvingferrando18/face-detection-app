export type TFaceDetectionResult = {
  results: Array<{
    rectangle: {
      left: number;
      top: number;
      right: number;
      bottom: number;
    };
    confidence: number;
    age: number;
    ageHigh: number;
    ageLow: number;
    gender: string;
  }>;
};

export type TFaceRectangle = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type TFaceDetails = {
  age: number;
  ageRange: string;
  gender: string;
};
