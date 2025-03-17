import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AuthState } from './auth.reducers';
import { ClientProfileState } from './clientprofile.reducers';
import { CountryState } from './country.reducers';
import { CityState } from './city.reducers';
import { LanguageState } from './lanuguage.reducer';
import { SkillsState } from './skills.reducers';
import { FreelancersState } from './freelancerprofile.reducers';
import { FaceVerificationState } from './faceverification.reducers';
interface AppState {
  auth: AuthState;
  clientProfile: ClientProfileState;
  countries: CountryState;
  cities: CityState;
  languages: LanguageState;
  skills: SkillsState;
  freelancerProfile: FreelancersState;
  faceVerification: FaceVerificationState;
}
export function localStorageMetaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    if (state === undefined) {
      const savedState = localStorage.getItem('appState');
      if (savedState) {
        state = JSON.parse(savedState);
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem('appState', JSON.stringify(nextState));
    return nextState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageMetaReducer];
