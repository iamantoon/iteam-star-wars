import { createReducer, on } from '@ngrx/store';
import { 
  loadMoviesSuccess, 
  loadMovieDetailsSuccess, 
  loadMovies, 
  loadMovieDetails, 
  loadMoviesFailure, 
  loadMovieDetailsFailure 
} from '../actions/movie.actions';
import { StarWarsFilm } from '../../shared/models/movie.model';

export interface MovieState {
  movies: StarWarsFilm[];
  loadingAllMovies: boolean;
  loadingMovieDetails: boolean;
  moviesError: string | null;
  movieDetailsError: string | null;
};

export const initialState: MovieState = {
  movies: [],
  loadingAllMovies: false,
  loadingMovieDetails: false,
  moviesError: null,
  movieDetailsError: null 
};

export const movieReducer = createReducer(
  initialState,
  on(loadMovies, (state) => ({
    ...state,
    loadingAllMovies: true
  })),
  on(loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    loadingAllMovies: false,
    movies
  })),
  on(loadMoviesFailure, (state, { error }) => ({
    ...state,
    moviesError: error,
    loadingAllMovies: false
  })),
  on(loadMovieDetails, (state) => ({
    ...state,
    loadingMovieDetails: true,
    loadingAllMovies: false
  })),
  on(loadMovieDetailsSuccess, (state, { movie }) => {
    const movieIndex = state.movies.findIndex(m => m.uid === movie.uid);
    const updatedMovies = movieIndex >= 0
      ? state.movies.map(m => m.uid === movie.uid ? movie : m)
      : [...state.movies, movie];

    return {
      ...state,
      movies: updatedMovies,
      loadingMovieDetails: false,
      loadingAllMovies: false
    };
  }),
  on(loadMovieDetailsFailure, (state, {error}) => ({
    ...state,
    movieDetailsError: error,
    loadingMovieDetails: false
  }))
);
