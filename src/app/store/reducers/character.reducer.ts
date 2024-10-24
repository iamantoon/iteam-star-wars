import { createReducer, on } from '@ngrx/store';
import { loadCharacterSuccess, loadCharacterFailure, loadCharacter } from '../actions/character.actions';
import { PersonProperties } from '../../shared/models/character.model';

export interface CharacterState {
  characters: { [url: string]: PersonProperties };
  loading: boolean;
  error: string | null;
}

export const initialState: CharacterState = {
  characters: {},
  loading: false,
  error: null
};

export const characterReducer = createReducer(
  initialState,
  on(loadCharacter, (state) => ({
    ...state,
    loading: true
  })),
  on(loadCharacterSuccess, (state, { character, url }) => ({
    ...state,
    loading: false,
    characters: {
      ...state.characters,
      [url]: character
    }
  })),
  on(loadCharacterFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);