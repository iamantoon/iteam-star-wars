import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieItemComponent } from './movie-item.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MovieState } from '../../../store/reducers/movie.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { loadMovieDetailsSuccess } from '../../../store/actions/movie.actions';
import { StarWarsFilm } from '../../../shared/models/movie.model';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;
  let router: Router;
  let store: Store<MovieState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieItemComponent],
      providers: [
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') }},
        provideMockStore()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadMovieDetailsSuccess and navigate to movie details page', () => {
    const mockMovie: StarWarsFilm = {
      properties: { 
        characters: [], 
        planets: [], 
        starships: [], 
        vehicles: [], 
        species: [], 
        created: '', 
        edited: '', 
        producer: '', 
        title: 'Test Movie', 
        episode_id: 1, 
        director: '', 
        release_date: '', 
        opening_crawl: '', 
        url: '' 
      },
      description: 'Test description',
      _id: '1',
      uid: '1',
      __v: 1
    };
  
    component.movie = mockMovie;
  
    spyOn(store, 'dispatch');

    component.navigateToMovieDetailsPage();
  
    expect(store.dispatch).toHaveBeenCalledWith(loadMovieDetailsSuccess({ movie: mockMovie }));
  
    expect(router.navigateByUrl).toHaveBeenCalledWith('/movies/1');
  });
  

  it('should not dispatch or navigate if movie is undefined', () => {
    spyOn(store, 'dispatch');
  
    component.movie = undefined;
  
    component.navigateToMovieDetailsPage();
  
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
