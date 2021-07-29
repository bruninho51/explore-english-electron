import { Definition } from './definition'
import { Example } from './example'
import { GrammarClass } from './grammar-class'
import { Pronunciation } from './pronunciation'

export interface Dictionary{
  getDictionaryContent: () => Promise<string>
  searchPronunciation: (params: { withSound?: boolean }) => Promise<Pronunciation>
  searchDefinitions: () => Promise<Definition[]>
  searchExamples: (params: { withSound?: boolean }) => Promise<Example[]>
  searchGrammarClasses: () => GrammarClass[]
  forWord: (word: string) => Dictionary
}
