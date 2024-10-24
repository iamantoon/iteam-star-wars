import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { StarWarsFilmDetailsResponse, StarWarsResponse } from '../../shared/models/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  const mockMoviesResponse: StarWarsResponse = {
    message: 'Success',
    result: [
      {
        properties: {
          characters: [],
          planets: [],
          starships: [],
          vehicles: [],
          species: [],
          created: '2014-12-20T20:10:07.868Z',
          edited: '2014-12-20T20:10:07.868Z',
          producer: 'George Lucas',
          title: 'A New Hope',
          episode_id: 4,
          director: 'George Lucas',
          release_date: '1977-05-25',
          opening_crawl: 'It is a period of civil war...',
          url: 'https://www.swapi.tech/api/films/1/',
        },
        description: 'The first film in the Star Wars series.',
        _id: '1',
        uid: '1',
        __v: 0,
      },
    ],
  };

  const mockMovieDetailResponse: StarWarsFilmDetailsResponse = {
    message: 'Success',
    result: {
      properties: {
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '2014-12-20T20:10:07.868Z',
        edited: '2014-12-20T20:10:07.868Z',
        producer: 'George Lucas',
        title: 'A New Hope',
        episode_id: 4,
        director: 'George Lucas',
        release_date: '1977-05-25',
        opening_crawl: 'It is a period of civil war...',
        url: 'https://www.swapi.tech/api/films/1/',
      },
      description: 'The first film in the Star Wars series.',
      _id: '1',
      uid: '1',
      __v: 0,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve movies data', () => {
    const testUrl = 'https://www.swapi.tech/api/films/';

    service.getMovies().subscribe((response) => {
      expect(response).toEqual(mockMoviesResponse);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMoviesResponse);
  });

  it('should retrieve movie details by ID', () => {
    const testId = 1;
    const testUrl = `https://www.swapi.tech/api/films/${testId}`;

    service.getMovie(testId).subscribe((response) => {
      expect(response).toEqual(mockMovieDetailResponse);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMovieDetailResponse);
  });
});
