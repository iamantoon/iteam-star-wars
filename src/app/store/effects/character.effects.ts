import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, of, catchError } from 'rxjs';
import { loadCharacter, loadCharacterSuccess, loadCharacterFailure } from '../actions/character.actions';
import { CharacterService } from '../../core/services/character.service';

@Injectable()
export class CharacterEffects {
  private characterService = inject(CharacterService);
  private actions$ = inject(Actions);

  public loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacter),
      mergeMap(({url}) =>
        this.characterService.getCharacterByUrl(url).pipe(
          map(response => loadCharacterSuccess({character: response.result.properties, url})),
          catchError((error) => of(loadCharacterFailure({error})))
        )
      )
    )
  );
}
