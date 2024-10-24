import { TestBed } from '@angular/core/testing';
import { CharacterDetailsComponent } from './character-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { selectCharacterByUrl } from '../../../store/selectors/character.selectors';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { selectMoviesByCharacterUrl } from '../../../store/selectors/movie.selectors';
import { loadMovies } from '../../../store/actions/movie.actions';
import { loadCharacter } from '../../../store/actions/character.actions';

describe('CharacterDetailsComponent', () => {
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharacterDetailsComponent,
        MatSnackBarModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            movie: { loadingAllMovies: false, loadingMovieDetails: false, movies: [] },
            character: { loading: false, characters: {} }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should dispatch loadMovies action and select movies by character on ngOnInit', () => {
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const component = fixture.componentInstance;

    spyOn(store, 'dispatch');

    spyOn(store, 'select').and.callFake(selector => {
      if (selector === selectMoviesByCharacterUrl) {
        return of([]);
      }
      return of(false);
    });

    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadMovies());
  });

  it('should navigate to home if id is not present in the route', () => {
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigateByUrl');

    spyOn(component['activatedRoute'].snapshot.paramMap, 'get').and.returnValue(null);

    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('should dispatch loadMovies action even if character is found in store', () => {
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const component = fixture.componentInstance;
  
    spyOn(store, 'dispatch');
  
    const characterId = '1';
    const characterUrl = `https://www.swapi.tech/api/people/${characterId}`;
  
    const mockCharacter = { name: 'Luke Skywalker', url: characterUrl };
  
    spyOn(store, 'select').and.callFake(selector => {
      if (selector === selectCharacterByUrl(characterUrl)) {
        return of(mockCharacter);
      } else if (selector === selectMoviesByCharacterUrl(characterUrl)) {
        return of([]);
      }
      return of(false);
    });
  
    component.ngOnInit();
  
    expect(store.dispatch).not.toHaveBeenCalledWith(loadCharacter({ url: characterUrl }));
    expect(store.dispatch).toHaveBeenCalledWith(loadMovies());
  });
  
  it('should navigate to movie details when navigateToMovieDetails is called', () => {
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.navigateToMovieDetails(1);
    expect(navigateSpy).toHaveBeenCalledWith('/movies/1');
  });

  it('should correctly select loading state from the store', () => {
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const component = fixture.componentInstance;

    store.setState({
      movie: { loadingAllMovies: false, loadingMovieDetails: false, movies: [] },
      character: { loading: true, characters: {} }
    });

    component.isLoading$.subscribe(loading => {
      expect(loading).toBeTrue();
    });
  });
});
