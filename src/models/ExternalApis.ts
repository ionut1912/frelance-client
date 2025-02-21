interface Country {
  name: { common: string };
  flags: { svg: string };
  cca2: string;
}

interface Language {
  code: string;
  name: string;
}

export type { Country, Language };
