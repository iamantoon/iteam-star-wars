import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharacterResponse } from '../../shared/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient);

  public getCharacterByUrl(url: string) {
    return this.http.get<CharacterResponse>(url);
  }
}
