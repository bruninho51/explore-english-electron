import https from 'https'
import cheerio from 'cheerio'
import { Example } from '@/domain/example'
import { GrammarClass } from '@/domain/grammar-class'
import { Definition } from '@/domain/definition'
import { Pronunciation } from '@/domain/pronunciation'
import { Dictionary } from '@/domain/dictionary'
import { WordNotFoundError } from '@/domain/errors/word-not-found-error'
import { UninitializedError } from '@/domain/errors/uninitialized-error'

export class Collins implements Dictionary {
  private readonly dictionaryUrl: string = 'https://www.collinsdictionary.com/pt/dictionary/english'
  private _word: string
  private $: any

  forWord (word: string): Collins {
    this._word = word
    return this
  }

  async getDictionaryContent (): Promise<string> {
    if (!this._word) {
      throw new WordNotFoundError()
    }

    let websiteContent: string
    return await new Promise((resolve, reject) => {
      https.get(`${this.dictionaryUrl}/${this._word}`, (res) => {
        res.on('data', data => {
          websiteContent += String(data)
        })

        if (res.statusCode && res.statusCode.toString()[0] !== '2') { reject(new WordNotFoundError()) }

        res.on('end', () => {
          if (!websiteContent) {
            reject(new WordNotFoundError())
          } else {
            this.$ = cheerio.load(websiteContent)
            resolve(websiteContent)
          }
        })
      }).on('error', (err) => reject(err))
    })
  }

  async searchPronunciation (params: { withSound: boolean }): Promise<Pronunciation> {
    if (!this._word) {
      throw new WordNotFoundError()
    }

    if (!this.$) { throw new UninitializedError() }

    const pronunciationContentText: string = this.$('.pron').text()
    const pronunciationText = pronunciationContentText.split('\n')[0]

    const pronunciationDownloadUrl: string = this.$('.sound').attr('data-src-mp3')

    const soundBuffer: Buffer = params.withSound ? await new Promise((resolve) => {
      https.get(pronunciationDownloadUrl, res => {
        const soundBuffers: Buffer[] = []

        res.on('data', chunk => {
          soundBuffers.push(chunk)
        })

        res.on('end', () => {
          resolve(Buffer.concat(soundBuffers))
        })
      })
    }) : Buffer.from('')

    return new Pronunciation(pronunciationText, soundBuffer, pronunciationDownloadUrl)
  }

  async searchDefinitions (): Promise<Definition[]> {
    if (!this._word) {
      throw new WordNotFoundError()
    }

    if (!this.$) { throw new UninitializedError() }

    const definitionsContent = this.$('.def').text().replace(/(\r\n|\r|\n)/g, '').split('.')

    return definitionsContent.map((definition: string) => new Definition(definition))
  }

  searchGrammarClasses (): GrammarClass[] {
    if (!this._word) {
      throw new WordNotFoundError()
    }

    if (!this.$) { throw new UninitializedError() }

    const cheerioElements = this.$('.hom>.gramGrp>.pos')

    const grammarClasses: GrammarClass[] = []

    for (let i = 0; i < cheerioElements.length; i++) {
      grammarClasses.push(new GrammarClass(cheerioElements[i].children[0].data))
    }

    return grammarClasses
  }

  async searchExamples (params: { withSound: boolean }): Promise<Example[]> {
    if (!this._word) {
      throw new WordNotFoundError()
    }

    if (!this.$) { throw new UninitializedError() }

    const exampleNodes = this.$('.type-example')
    const examples: Example[] = []

    for (let i = 0; i < exampleNodes.length; i++) {
      let exampleText: string

      if (exampleNodes[i].children[0].data) {
        exampleText = exampleNodes[i].children[0].data
        examples.push(new Example(exampleText, Buffer.from(''), ''))
      } else {
        exampleText = exampleNodes[i].children[0].children[0].data

        let exampleSoundUrl: any
        try {
          exampleSoundUrl = exampleNodes[i].children[1].children[0].attribs['data-src-mp3']
        } catch (error) {
          exampleSoundUrl = exampleNodes[i].children[3].children[1].attribs['data-src-mp3']
        }

        const soundBuffer: Buffer = params.withSound ? await new Promise((resolve) => {
          https.get(exampleSoundUrl, res => {
            const soundBuffers: Buffer[] = []

            res.on('data', chunk => {
              soundBuffers.push(chunk)
            })

            res.on('end', () => {
              resolve(Buffer.concat(soundBuffers))
            })
          })
        }) : Buffer.from('')

        examples.push(new Example(exampleText, soundBuffer, exampleSoundUrl))
      }
    }

    return examples
  }
}
