import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CharacterState } from '../reducers/character.reducer';
import { selectMovieDetailsLoading, selectMoviesLoading } from './movie.selectors';

export const selectCharacterState = createFeatureSelector<CharacterState>('character');

export const selectCharacterByUrl = (url: string) => createSelector(selectCharacterState, (state) => {
  return state.characters[url];
});

export const selectCharacterLoading = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.loading
);

export const selectCharacterDetailsAndMoviesLoading = createSelector(
  selectCharacterLoading,   
  selectMoviesLoading,
  (characterLoading, moviesLoading) => characterLoading || moviesLoading 
);

export const selectMovieDetailsAndCharactersLoading = createSelector(
  selectCharacterLoading,
  selectMovieDetailsLoading,
  (characterLoading, movieLoading) => characterLoading || movieLoading 
);