import axios from "axios";

interface BackendValidationError {
  property: string;
  errorMessage: string;
}

interface ValidationErrorResponse {
  status: number;
  detail: string;
  errors?: BackendValidationError[];
}

export function extractErrorMessages(err: unknown): string[] {
  if (axios.isAxiosError<ValidationErrorResponse>(err)) {
    const data = err.response?.data;

    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      return data.errors.map((e) => `${e.property}: ${e.errorMessage}`);
    }

    if (data?.detail) {
      return [data.detail];
    }

    if (err.message) {
      return [err.message];
    }
  }

  return ["Unexpected error"];
}
