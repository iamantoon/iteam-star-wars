import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieDetailsComponent } from './movie-details.component';
import { loadMovieDetails } from '../../../store/actions/movie.actions';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let store: MockStore;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        provideMockStore({}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadMovieDetails on ngOnInit', () => {
    spyOn(store, 'dispatch');
    
    component.ngOnInit();
    
    expect(store.dispatch).toHaveBeenCalledWith(loadMovieDetails({ id: '1' }));
  });

  it('should navigate to character details page', () => {
    const url = 'https://www.swapi.tech/api/people/1';
    
    component.navigateToCharacterDetailsPage(url);
    
    expect(router.navigateByUrl).toHaveBeenCalledWith('/characters/1');
  });
});
