import { Component, inject, Input, input } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { StarWarsFilm } from '../../../shared/models/movie.model';
import { Router, RouterLink } from '@angular/router';
import { MovieState } from '../../../store/reducers/movie.reducer';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { loadMovieDetailsSuccess } from '../../../store/actions/movie.actions';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [
    MatCard, 
    MatCardContent, 
    DatePipe, 
    MatCardActions, 
    RouterLink
  ],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss'
})
export class MovieItemComponent {
  @Input({required: true}) public movie?: StarWarsFilm;
  private router = inject(Router);
  private store = inject(Store<MovieState>);

  public navigateToMovieDetailsPage() {
    if (this.movie) {
      this.store.dispatch(loadMovieDetailsSuccess({movie: this.movie}));
      this.router.navigateByUrl(`/movies/${this.movie.uid}`);
    }
  }
}
