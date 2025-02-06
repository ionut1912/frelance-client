import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from '../store/reducers/auth.reducers';
import { AuthEffects } from '../store/effects/auth.effects';
import { BASE_API_URL } from './base_url';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const APP_PROVIDERS = [
  provideAnimations(),
  provideRouter(routes),
  provideHttpClient(),
  provideStore({ auth: authReducer }),
  provideEffects([AuthEffects]),
  importProvidersFrom(MatSnackBarModule),
  { provide: BASE_API_URL, useValue: 'https://frelance-api.azurewebsites.net' }
];
