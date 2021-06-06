import { Validation, ValidationError } from '@/validation/protocols'
import * as yup from 'yup'

export class SentenceStoreValidation implements Validation {
  async validate (input: any): Promise<ValidationError[]> {
    const schema = yup.object().shape({
      sentence: yup.string().required(),
      wordIndex: yup.number().required().positive().integer()
    })

    try {
      await schema.validate(input, { abortEarly: false })
      return null
    } catch (error) {
      const yupError = error as yup.ValidationError
      return yupError.inner.reduce((errs: ValidationError[], err: yup.ValidationError): ValidationError[] => {
        return [...errs, {
          path: err.path,
          errors: err.errors
        }]
      }, [])
    }
  }
}
