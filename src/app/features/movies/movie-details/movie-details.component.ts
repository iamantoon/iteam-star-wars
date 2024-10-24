import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieState } from '../../../store/reducers/movie.reducer';
import { combineLatest, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { StarWarsFilm } from '../../../shared/models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { loadMovieDetails } from '../../../store/actions/movie.actions';
import { PersonProperties } from '../../../shared/models/character.model';
import { loadCharacter } from '../../../store/actions/character.actions';
import { selectCharacterByUrl } from '../../../store/selectors/character.selectors';
import { selectMovieByUid } from '../../../store/selectors/movie.selectors';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    LetDirective, 
    NgIf, 
    AsyncPipe, 
    NgFor, 
    DatePipe,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatProgressSpinner
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  private store = inject(Store<MovieState>);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public currentMovie$: Observable<StarWarsFilm | null> = of(null);
  public characters$: Observable<PersonProperties[]> = of([]);

  public ngOnInit(): void {
    this.loadMovie();
    this.loadCharacters();
  }

  private loadMovie(): void {
    const uid = this.activatedRoute.snapshot.paramMap.get('id');

    if (uid) {
      this.currentMovie$ = this.store.select(selectMovieByUid(uid));
      this.store.dispatch(loadMovieDetails({ id: uid }));
    }
  }

  public loadCharacters(): void {
    this.characters$ = this.currentMovie$.pipe(
      filter((movie) => !!movie),
      switchMap((movie) => {
        const characterRequests = movie.properties.characters.map((url: string) => 
          this.store.select(selectCharacterByUrl(url)).pipe(
            tap(character => {
              if (!character) {
                this.store.dispatch(loadCharacter({ url }));
              }
            })
          )
        );
  
        return combineLatest(characterRequests).pipe(
          map((characters) => characters.filter(Boolean))
        );
      })
    );
  }
  
  public navigateToCharacterDetailsPage(url: string) {
    const id = url.split('/').filter(Boolean).pop();
    if (id) this.router.navigateByUrl(`/characters/${id}`);
  }
}
