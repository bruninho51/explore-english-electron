import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SentenceCardExporter } from '@/data/repositories/card-exporter'
import { Collins } from '@/data/dictionaries/collins'
import Anki from '@/data/repositories/anki'
import { DefaultAnkiCardTheme } from '@/data/card-themes/anki-card-theme'
import { makeSentenceWordGetter } from '../usecases/sentence-world-getter-factory'
import { SentenceCardExportController } from '@/presentation/controllers/sentence-card-export'
import { SentenceShowValidation } from '@/validation/validators/sentence-show-validation'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'

export const makeCollinsAnkiSentenceCardExportController = async (deck: string): Promise<Controller> => {
  const validation = new SentenceShowValidation(new YupValidationErrorsParser())
  const dictionary = new Collins()
  const cardRepository = new Anki(deck, new DefaultAnkiCardTheme())
  const exporter = new SentenceCardExporter(dictionary, cardRepository, makeSentenceWordGetter())
  const controller = new SentenceCardExportController(validation, exporter)
  return await makeMongooseLogControllerDecorator(controller)
}
