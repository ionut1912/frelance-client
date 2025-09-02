interface Country {
  name: { common: string };
  flags: { svg: string };
  cca2: string;
}

interface Language {
  code: string;
  name: string;
}

interface LoadCountriesResult {
  countries: Country[];
}

interface LoadCitiesPayload {
  country: Country;
}

interface LoadCitiesResult {
  cities: string[];
}

export type {
  Country,
  LoadCountriesResult,
  LoadCitiesPayload,
  LoadCitiesResult,
  Language,
};
