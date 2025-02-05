import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from "./store/reducers/auth.reducers";
import { AuthEffects } from "./store/effects/auth.effects";
import {BASE_API_URL} from './app/base_url';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    importProvidersFrom(ToastrModule.forRoot()),
    { provide: BASE_API_URL, useValue: 'https://frelance-api.azurewebsites.net/' }
  ]
})
  .catch(err => console.error(err));
