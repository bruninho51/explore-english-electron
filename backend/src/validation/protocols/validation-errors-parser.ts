import { ValidationError } from '@/validation/protocols'

export interface ValidationErrorsParser<T> {
  parse: (errors: T) => Promise<ValidationError[]>
}
