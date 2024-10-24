import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { movieReducer } from './store/reducers/movie.reducer';
import { MovieEffects } from './store/effects/movie.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CharacterEffects } from './store/effects/character.effects';
import { characterReducer } from './store/reducers/character.reducer';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideStore(),
    provideAnimationsAsync(),
    provideEffects(MovieEffects, CharacterEffects),
    provideState({name: 'movie', reducer: movieReducer}),
    provideState({name: 'character', reducer: characterReducer})
  ]
};
