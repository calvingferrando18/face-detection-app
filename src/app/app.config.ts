import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { AppService } from './app.service';
import { provideHttpClient } from '@angular/common/http';
import { faceDetectionReducer } from './store/face-detection/face-detection.reducer';
import { FaceDetectionEffects } from './store/face-detection/face-detection.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    AppService,
    provideStore({
      faceDetection: faceDetectionReducer,
    }),
    provideEffects([FaceDetectionEffects]),
  ],
};
