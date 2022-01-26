import { Card } from './card';
import { Dictionary } from './protocols/dictionary';
import { Element } from './element';
import { Sentence as SentenceModel } from './models/sentence';
import { SentenceWordGetterUC } from './usecases/protocols/sentence-word-getter-uc';

export class Sentence extends Element {
  private readonly _sentence: SentenceModel
  private readonly _dictionary: Dictionary
  private readonly _sentenceWordGetter: SentenceWordGetterUC

  /**
     * Constructor of the Sentence class
     * @param {SentenceModel} sentence The main sentence of the card
     * @param {object} dictionary Instance of an implementation of the Dictionary interface
     */
  public constructor (
    sentence: SentenceModel,
    dictionary: Dictionary,
    sentenceWordGetter: SentenceWordGetterUC
  ) {
    super();
    this._sentence = sentence;
    this._dictionary = dictionary;
    this._sentenceWordGetter = sentenceWordGetter;
  }

  /**
     * Encapsulation of the _sentence property
     */
  get sentence (): SentenceModel {
    return this._sentence;
  }

  /**
     * @function searchForWord
     * Method responsible for searching the word on the implemented dictionary
     */
  public async searchForWord (): Promise<Card> {
    const card = new Card();

    await this._dictionary.forWord(
      this._sentenceWordGetter.getWord(this._sentence)
    ).getDictionaryContent();

    console.log('conteúdo do dicionário carregado!');

    // pode não ter áudio
    const examples = await this._dictionary.searchExamples({ withSound: true });
    console.log('exemplos carregados!');

    const definitions = await this._dictionary.searchDefinitions();
    console.log('definições carregados!');

    const grammarClasses = await this._dictionary.searchGrammarClasses();
    console.log('classes gramaticais carregados!');

    // pode ser nulo
    const pronunciation = await this._dictionary.searchPronunciation({ withSound: true });
    console.log('pronuncias carregados!');

    card.pushChild(this);

    if (pronunciation) {
      card.pushChild(pronunciation);
    }

    grammarClasses.forEach((gC: Element, index: number) => {
      card.pushChild(gC);
      if (examples[index]) gC.pushChild(examples[index]);
      if (definitions[index]) gC.pushChild(definitions[index]);
    });

    return card;
  }
}
