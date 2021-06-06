import { ValidationError, ValidationErrorsParser } from '@/validation/protocols'
import * as yup from 'yup'

export class YupValidationErrorsParser implements ValidationErrorsParser<yup.ValidationError> {
  async parse (errors: yup.ValidationError): Promise<ValidationError[]> {
    return errors.inner.reduce((errs: ValidationError[], err: yup.ValidationError): ValidationError[] => {
      return [...errs, {
        path: err.path,
        errors: err.errors
      }]
    }, [])
  }
}
