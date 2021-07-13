import { Definition } from './definition'
import { Example } from './example'
import { GrammarClass } from './grammar-class'
import { Pronunciation } from './pronunciation'

export interface Dictionary{
  getDictionaryContent: () => Promise<string>
  searchPronunciation: () => Promise<Pronunciation>
  searchDefinitions: () => Promise<Definition[]>
  searchExamples: () => Promise<Example[]>
  searchGrammarClasses: () => GrammarClass[]
}
