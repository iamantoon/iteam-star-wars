import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieState } from '../../../store/reducers/movie.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonProperties } from '../../../shared/models/character.model';
import { Observable, of, tap } from 'rxjs';
import { 
  selectCharacterByUrl, 
  selectCharacterDetailsAndMoviesLoading 
} from '../../../store/selectors/character.selectors';
import { loadCharacter } from '../../../store/actions/character.actions';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { StarWarsFilm } from '../../../shared/models/movie.model';
import { selectMoviesByCharacterUrl } from '../../../store/selectors/movie.selectors';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { loadMovies } from '../../../store/actions/movie.actions';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    NgIf, 
    LetDirective, 
    AsyncPipe, 
    NgFor, 
    MatCard, 
    MatCardTitle, 
    MatCardContent,
    MatProgressSpinner
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit {
  private store = inject(Store<MovieState>);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public currentCharacter$: Observable<PersonProperties | null> = of(null);
  public moviesByCharacter$: Observable<StarWarsFilm[]> = of([]);  
  public isLoading$: Observable<boolean> = this.store.select(selectCharacterDetailsAndMoviesLoading);
  private baseUrl = environment.apiUrl + 'people/';

  public ngOnInit(): void {
    this.loadCharacter();
    this.loadMoviesByCharacter();
  }

  private loadCharacter(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const url = this.baseUrl + id;
      this.currentCharacter$ = this.store.select(selectCharacterByUrl(url)).pipe(
        tap(character => {
          if (!character) {
            this.store.dispatch(loadCharacter({url}));
          }
        })
      );
    } else {
      this.router.navigateByUrl('/');
    }
  }

  private loadMoviesByCharacter(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const url = this.baseUrl + id;
      this.store.dispatch(loadMovies()); 
      this.moviesByCharacter$ = this.store.select(selectMoviesByCharacterUrl(url));
    }
  }

  public navigateToMovieDetails(id: number): void {
    this.router.navigateByUrl(`/movies/${id}`);
  }
}
