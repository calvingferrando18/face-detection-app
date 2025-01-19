import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppService } from '../../app.service';
import {
  detectFace,
  detectFaceFailure,
  detectFaceSuccess,
} from './face-detection.actions';

@Injectable({
  providedIn: 'root',
})
export class FaceDetectionEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly appService: AppService = inject(AppService);

  detectFace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(detectFace),
      mergeMap(({ image }) =>
        this.appService.detect(image).pipe(
          map((result) => {
            if (result.results.length === 0) {
              return detectFaceFailure({ error: 'No faces detected' });
            } else if (result.results.length > 1) {
              return detectFaceFailure({ error: 'Multiple faces detected' });
            }
            return detectFaceSuccess({ image, result });
          }),
          catchError((error) => of(detectFaceFailure({ error: error.message })))
        )
      )
    )
  );
}
