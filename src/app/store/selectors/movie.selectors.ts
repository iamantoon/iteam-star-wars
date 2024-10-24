import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from '../reducers/movie.reducer';

export const selectMovieState = createFeatureSelector<MovieState>('movie');

export const selectAllMovies = createSelector(selectMovieState, (state) => state.movies);

export const selectMoviesByCharacterUrl = (url: string) => createSelector(selectAllMovies, (movies) => {
  return movies.filter(movie => movie.properties.characters.includes(url));
});

export const selectMovieByUid = (uid: string) => createSelector(selectAllMovies, (movies) => {
  return movies.find(movie => movie.uid === uid) || null;
});

export const selectMoviesLoading = createSelector(
  selectMovieState,
  (movieState: MovieState) => {
    return movieState.loadingAllMovies
  }
);

export const selectMovieDetailsLoading = createSelector(
  selectMovieState,
  (movieState: MovieState) => {
    return movieState.loadingMovieDetails
  }
);