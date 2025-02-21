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
import { countryReducers } from '../store/reducers/country.reducers';
import { CityEffects } from '../store/effects/city.effects';
import { cityReducers } from '../store/reducers/city.reducers';
import { languageReducer } from '../store/reducers/lanuguage.reducer';
import { LanguageEffects } from '../store/effects/languages.effects';
import { SkillsEffects } from '../store/effects/skills.effects';
import { skillReducer } from '../store/reducers/skills.reducers';
import { FreelancerProfileEffects } from '../store/effects/freelancerprofile.effects';
import { freelancerProfileReducer } from '../store/reducers/freelancerprofile.reducers';

export const APP_PROVIDERS = [
  provideAnimations(),
  provideRouter(routes),
  provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
  provideStore({
    auth: authReducer,
    clientProfile: clientProfileReducer,
    countries: countryReducers,
    cities: cityReducers,
    languages: languageReducer,
    skills: skillReducer,
    freelancerProfile: freelancerProfileReducer,
  }),
  provideEffects([
    AuthEffects,
    ClientProfilesEffects,
    CountryEffects,
    CityEffects,
    LanguageEffects,
    SkillsEffects,
    FreelancerProfileEffects,
  ]),
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(ToastrModule.forRoot()),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: environment.production,
  }),
  { provide: BASE_API_URL, useValue: 'https://localhost:7020' },
];
