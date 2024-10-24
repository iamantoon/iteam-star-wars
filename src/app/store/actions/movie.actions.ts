import { createAction, props } from '@ngrx/store';
import { StarWarsFilm } from '../../shared/models/movie.model';


export const loadMovies = createAction('[Movie] Load Movies');

export const loadMoviesSuccess = createAction(
  '[Movie] Load Movies Success',
  props<{ movies: StarWarsFilm[] }>()
);

export const loadMoviesFailure = createAction(
  '[Movie] Load Movies Failure',
  props<{ error: string }>()
);


export const loadMovieDetails = createAction(
  '[Movie] Load Movie Details',
  props<{ id: string }>()
);

export const loadMovieDetailsSuccess = createAction(
  '[Movie] Load Movie Details Success', 
  props<{ movie: StarWarsFilm }>()
);

export const loadMovieDetailsFailure = createAction(
  '[Movie] Load Movie Details Failure', 
  props<{ error: string }>()
);