import { createAction, props } from '@ngrx/store';
import { PersonProperties } from '../../shared/models/character.model';

export const loadCharacter = createAction(
  '[Character] Load Character',
  props<{url: string}>()
);

export const loadCharacterSuccess = createAction(
  '[Character] Load Character Success',
  props<{character: PersonProperties, url: string}>()
);

export const loadCharacterFailure = createAction(
  '[Character] Load Character Failure',
  props<{error: string}>()
);
