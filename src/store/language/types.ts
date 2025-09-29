import { AxiosError } from "axios";
import { Language } from "../../models/ExternalApis";

export interface LanguageState {
  languages: Language[];
  loading: boolean;
  error: AxiosError | null;
}
