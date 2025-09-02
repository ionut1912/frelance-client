import { Country } from "../../models/ExternalApis";

export interface CountryState {
  countries: Country[];
  error: string | null;
}
