import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, take, withLatestFrom } from 'rxjs';
import { MovieService } from '../../core/services/movie.service';
import {
  loadMovies,
  loadMoviesSuccess, 
  loadMoviesFailure, 
  loadMovieDetails, 
  loadMovieDetailsSuccess, 
  loadMovieDetailsFailure
} from '../actions/movie.actions';
import { Store } from '@ngrx/store';
import { MovieState } from '../reducers/movie.reducer';
import { selectAllMovies, selectMovieByUid } from '../selectors/movie.selectors';

@Injectable()
export class MovieEffects {
  private movieService = inject(MovieService);
  private actions$ = inject(Actions);
  private store = inject(Store<MovieState>);

  public loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovies),
      withLatestFrom(this.store.select(selectAllMovies)),
      switchMap(([_, movies]) => {
        if (movies.length >= 2) {
          return of(loadMoviesSuccess({ movies }));
        }
        return this.movieService.getMovies().pipe(
          map(response => loadMoviesSuccess({ movies: response.result })),
          catchError(error => of(loadMoviesFailure({ error })))
        );
      })
    );
  });

  public loadMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovieDetails),
      switchMap((action) => 
        this.store.select(selectMovieByUid(action.id)).pipe(
          take(1),
          switchMap(movie => {
            if (movie) {
              return of(loadMovieDetailsSuccess({ movie }));
            }
            return this.movieService.getMovie(+action.id).pipe(
              map(response => loadMovieDetailsSuccess({ movie: response.result })),
              catchError(error => of(loadMovieDetailsFailure({ error })))
            );
          })
        )
      )
    )
  );
}
