import { Component, inject, OnInit } from '@angular/core';
import { MovieState } from '../../store/reducers/movie.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StarWarsFilm } from '../../shared/models/movie.model';
import { selectAllMovies, selectMoviesLoading } from '../../store/selectors/movie.selectors';
import { loadMovies } from '../../store/actions/movie.actions';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { LetDirective, PushPipe } from '@ngrx/component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MovieItemComponent, 
    LetDirective, 
    PushPipe, 
    NgIf,
    MatProgressSpinner,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  private store = inject(Store<MovieState>);
  public movies$: Observable<StarWarsFilm[]> = this.store.select(selectAllMovies);
  public isMoviesLoading$: Observable<boolean> = this.store.select(selectMoviesLoading);

  public ngOnInit(): void {
    this.store.dispatch(loadMovies());
  }

  trackByUid(index: number, movie: StarWarsFilm): string {
    return movie.uid;
  }  
}
