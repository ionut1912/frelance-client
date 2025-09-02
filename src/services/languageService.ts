import axios, { AxiosResponse } from "axios";
import { Language } from "../models/ExternalApis";

export default function getLanguages(): Promise<AxiosResponse<Language[]>> {
  const apiUrl = "https://libretranslate.com/languages";
  return axios.get<Language[]>(`${apiUrl}`);
}
