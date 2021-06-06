import { ValidationError } from '@/validation/protocols'

export interface Validation {
  validate: (input: any) => Promise<ValidationError[]>
}
