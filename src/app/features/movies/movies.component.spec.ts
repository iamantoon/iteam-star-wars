import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MoviesComponent } from './movies.component';
import { StarWarsFilm } from '../../shared/models/movie.model';
import { of } from 'rxjs';
import { loadMovies } from '../../store/actions/movie.actions';

describe('MoviesComponent', () => {
  let store: MockStore;
  const initialState = {
    movies: [],
    loadingMovies: false,
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MoviesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should dispatch loadMovies action on ngOnInit', () => {
    const fixture = TestBed.createComponent(MoviesComponent);
    const component = fixture.componentInstance;
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadMovies());
  });

  it('should select the loading state from the store', () => {
    spyOn(store, 'select').and.returnValue(of(true));
    const fixture = TestBed.createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    component.isMoviesLoading$.subscribe((loading) => {
      expect(loading).toBeTrue();
    });
  });
  
  it('should select all movies from the store', () => {
    const mockMovies: StarWarsFilm[] = [{ 
      properties: { 
        title: 'Mock Movie', 
        characters: [], 
        planets: [], 
        starships: [], 
        vehicles: [], 
        species: [], 
        created: '', 
        edited: '', 
        producer: '', 
        director: '', 
        release_date: '', 
        opening_crawl: '', 
        episode_id: 1, 
        url: '' 
      }, 
      description: '', _id: '1', uid: '1', __v: 0 
    }];
  
    spyOn(store, 'select').and.returnValue(of(mockMovies));
    const fixture = TestBed.createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    component.movies$.subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0].properties.title).toBe('Mock Movie');
    });
  });
});
