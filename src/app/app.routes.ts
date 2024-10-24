import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './features/movies/movie-details/movie-details.component';
import { CharacterDetailsComponent } from './features/characters/character-details/character-details.component';
import { MoviesComponent } from './features/movies/movies.component';

export const routes: Routes = [
  {path: '', component: MoviesComponent},
  {path: 'movies/:id', component: MovieDetailsComponent},
  {path: 'characters/:id', component: CharacterDetailsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
