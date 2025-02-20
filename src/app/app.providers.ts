import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from '../store/reducers/auth.reducers';
import { AuthEffects } from '../store/effects/auth.effects';
import { BASE_API_URL } from './base_url';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from './envitonments/environment';
import { clientProfileReducer } from '../store/reducers/clientprofile.reducers';
import { ClientProfilesEffects } from '../store/effects/clientprofiles.effects';
import { jwtInterceptor } from '../services/interceptors/TokenInterceptor';
import { CountryEffects } from '../store/effects/country.effects';
import { countryReducer } from '../store/reducers/country.reducer';
import { CityEffects } from '../store/effects/city.effects';
import { cityReducer } from '../store/reducers/city.reducer';

export const APP_PROVIDERS = [
  provideAnimations(),
  provideRouter(routes),
  provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
  provideStore({
    auth: authReducer,
    clientProfile: clientProfileReducer,
    countries: countryReducer,
    cities: cityReducer,
  }),
  provideEffects([
    AuthEffects,
    ClientProfilesEffects,
    CountryEffects,
    CityEffects,
  ]),
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(ToastrModule.forRoot()),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: environment.production,
  }),
  { provide: BASE_API_URL, useValue: 'https://localhost:7020' },
];
