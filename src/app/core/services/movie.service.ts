import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StarWarsFilmDetailsResponse, StarWarsResponse } from '../../shared/models/movie.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'films/';

  public getMovies() {
    return this.http.get<StarWarsResponse>(this.baseUrl);
  }

  public getMovie(id: number) {
    return this.http.get<StarWarsFilmDetailsResponse>(this.baseUrl + id);
  }
}
