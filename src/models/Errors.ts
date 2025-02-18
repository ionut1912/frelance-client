interface Errors {
  status: number;
  title: string;
  detail: string;
  errors?: ErrorDetail[];
}

interface ErrorDetail {
  property: string;
  errorMessage: string;
}

export type { Errors, ErrorDetail };
