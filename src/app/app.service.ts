import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TFaceDetectionResult } from './types/face-detection.types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  detect(image: string): Observable<TFaceDetectionResult> {
    return this.http.post<TFaceDetectionResult>(`${this.apiUrl}/detect`, {
        sourceUrl: image,
    });
  }
}
