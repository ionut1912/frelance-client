import { AxiosError } from 'axios'

type BackendValidationError = {
  property: string
  errorMessage: string
}

interface ValidationErrorResponse {
  status: number
  detail: string
  errors?: BackendValidationError[]
}

export function extractErrorMessages(err: unknown): string[] {
  const ax = err as AxiosError<ValidationErrorResponse>

  if (ax?.isAxiosError) {
    const data = ax.response?.data
    if (Array.isArray(data?.errors) && data.errors.length) {
      return data.errors.map(e => `${e.property}: ${e.errorMessage}`)
    }
    if (data?.detail) return [data.detail]
    if (ax.message) return [ax.message]
  }
  return ['Unexpected error']
}
