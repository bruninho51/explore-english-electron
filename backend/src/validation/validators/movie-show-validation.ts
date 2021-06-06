import { Validation, ValidationError, ValidationErrorsParser } from '@/validation/protocols'
import * as yup from 'yup'

export class MovieShowValidation implements Validation {
  constructor (private readonly validationParser: ValidationErrorsParser<yup.ValidationError>) {}

  async validate (input: any): Promise<ValidationError[]> {
    const schema = yup.object().shape({
      movieId: yup.string().required()
    })

    try {
      await schema.validate(input, { abortEarly: false })
      return null
    } catch (error) {
      return await this.validationParser.parse(error as yup.ValidationError)
    }
  }
}
