import { Card } from './card'
import { Dictionary } from './dictionary'
import { Element } from './element'

export class Sentence extends Element {
  private readonly _sentence: string
  private readonly _dictionary: Dictionary

  /**
     * Constructor of the Sentence class
     * @param {string} sentence The main sentence of the card
     * @param {object} dictionary Instance of an implementation of the Dictionary interface
     */
  public constructor (
    sentence: string,
    dictionary: Dictionary
  ) {
    super()
    this._sentence = sentence
    this._dictionary = dictionary
  }

  /**
     * Encapsulation of the _sentence property
     */
  get sentence (): string {
    return this._sentence
  }

  /**
     * @function searchForWord
     * Method responsible for searching the word on the implemented dictionary
     */
  public async searchForWord (): Promise<Card> {
    const card = new Card()

    await this._dictionary.getDictionaryContent()

    const examples = await this._dictionary.searchExamples()
    const definitions = await this._dictionary.searchDefinitions()
    const grammarClasses = await this._dictionary.searchGrammarClasses()
    const pronunciation = await this._dictionary.searchPronunciation()

    card.pushChild(this)
    card.pushChild(pronunciation)

    grammarClasses.forEach((gC, index) => {
      card.pushChild(gC)
      if (examples[index]) gC.pushChild(examples[index])
      if (definitions[index]) gC.pushChild(definitions[index])
    })

    return card
  }
}
