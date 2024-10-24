import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';
import { CharacterResponse } from '../../shared/models/character.model';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpTestingController: HttpTestingController;

  const mockCharacterResponse: CharacterResponse = {
    message: 'Success',
    result: {
      properties: {
        height: '172',
        mass: '77',
        hair_color: 'Brown',
        skin_color: 'Light',
        eye_color: 'Blue',
        birth_year: '1980',
        gender: 'Male',
        created: '2014-12-20T20:10:07.868Z',
        edited: '2014-12-20T20:10:07.868Z',
        name: 'Luke Skywalker',
        homeworld: 'https://www.swapi.tech/api/planets/1/',
        url: 'https://www.swapi.tech/api/people/1/',
      },
      description: 'Jedi Master',
      _id: '1',
      uid: '1',
      __v: 0,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService],
    });
    service = TestBed.inject(CharacterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve character data by URL', () => {
    const testUrl = 'https://www.swapi.tech/api/people/1/';

    service.getCharacterByUrl(testUrl).subscribe((response) => {
      expect(response).toEqual(mockCharacterResponse);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCharacterResponse);
  });
});
