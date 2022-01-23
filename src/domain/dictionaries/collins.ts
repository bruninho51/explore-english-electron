import https from 'https';
import cheerio from 'cheerio';
import { Example } from '../example';
import { GrammarClass } from '../grammar-class';
import { Definition } from '../definition';
import { Pronunciation } from '../pronunciation';
import { Dictionary } from '../protocols/dictionary';
import { WordNotFoundError } from '../errors/word-not-found-error';
import { UninitializedError } from '../errors/uninitialized-error';
import { BrowserWindow } from 'electron';

export class CollinsElectron implements Dictionary {
  private readonly dictionaryUrl: string = 'https://www.collinsdictionary.com/pt/dictionary/english'
  private _word: string
  private $: any

  constructor (private readonly scrapingWindow: BrowserWindow) {}

  forWord (word: string): CollinsElectron {
    this._word = word;
    return this;
  }

  async getDictionaryContent (): Promise<string> {
    if (!this._word) {
      console.log('word: ', this._word);
      throw new WordNotFoundError();
    }

    return await new Promise((resolve, reject) => {
      // carrega página do collins na janela o extrai o html
      const url = `${this.dictionaryUrl}/${this._word}`;
      this.scrapingWindow.loadURL(url);

      this.scrapingWindow.webContents.executeJavaScript(`
        function gethtml () {
          return new Promise((resolve, reject) => { resolve(document.documentElement.innerHTML); });
        }
        gethtml();`
      )
        .then(websiteContent => {
          console.log('websiteContent');
          if (!websiteContent) {
            reject(new WordNotFoundError());
          } else {
            this.$ = cheerio.load(websiteContent);
            resolve(websiteContent);
          }
        });
    });
  }

  async searchPronunciation (params: { withSound: boolean }): Promise<Pronunciation> {
    if (!this._word) {
      console.log('word: ', this._word);
      throw new WordNotFoundError();
    }

    if (!this.$) { throw new UninitializedError(); }

    const pronunciationContentText: string = this.$('.pron').text();
    const pronunciationText = pronunciationContentText.split('\n')[0];

    const pronunciationDownloadUrl: string = this.$('.sound').attr('data-src-mp3');

    const soundBuffer: Buffer = params.withSound
      ? await new Promise((resolve) => {
        https.get(pronunciationDownloadUrl, res => {
          const soundBuffers: Buffer[] = [];

          res.on('data', chunk => {
            soundBuffers.push(chunk);
          });

          res.on('end', () => {
            resolve(Buffer.concat(soundBuffers));
          });
        });
      })
      : Buffer.from('');

    return new Pronunciation(pronunciationText, soundBuffer, pronunciationDownloadUrl);
  }

  async searchDefinitions (): Promise<Definition[]> {
    if (!this._word) {
      console.log('word: ', this._word);
      throw new WordNotFoundError();
    }

    if (!this.$) { throw new UninitializedError(); }

    const definitionsContent = this.$('.def').text().replace(/(\r\n|\r|\n)/g, '').split('.');

    return definitionsContent.map((definition: string) => new Definition(definition));
  }

  searchGrammarClasses (): GrammarClass[] {
    if (!this._word) {
      console.log('word: ', this._word);
      throw new WordNotFoundError();
    }

    if (!this.$) { throw new UninitializedError(); }

    const cheerioElements = this.$('.hom>.gramGrp>.pos');

    const grammarClasses: GrammarClass[] = [];

    for (let i = 0; i < cheerioElements.length; i++) {
      grammarClasses.push(new GrammarClass(cheerioElements[i].children[0].data));
    }

    return grammarClasses;
  }

  async searchExamples (params: { withSound: boolean }): Promise<Example[]> {
    if (!this._word) {
      console.log('word: ', this._word);
      throw new WordNotFoundError();
    }

    if (!this.$) { throw new UninitializedError(); }
    const exampleNodes = this.$('.type-example');
    const examples: Example[] = [];

    for (let i = 0; i < exampleNodes.length; i++) {
      let exampleText: string;

      if (exampleNodes[i].children[0].data) {
        exampleText = exampleNodes[i].children[0].data;
        examples.push(new Example(exampleText, Buffer.from(''), ''));
      } else {
        exampleText = exampleNodes[i].children[0].children[0].data;

        let exampleSoundUrl: any;
        try {
          exampleSoundUrl = exampleNodes[i]?.children[1]?.children[0]?.attribs['data-src-mp3'];
        } catch (error) {
          exampleSoundUrl = exampleNodes[i]?.children[3]?.children[1]?.attribs['data-src-mp3'];
        }

        const soundBuffer: Buffer = exampleSoundUrl && params.withSound
          ? await new Promise((resolve) => {
            https.get(exampleSoundUrl, res => {
              const soundBuffers: Buffer[] = [];

              res.on('data', chunk => {
                soundBuffers.push(chunk);
              });

              res.on('end', () => {
                resolve(Buffer.concat(soundBuffers));
              });
            });
          })
          : Buffer.from('');

        examples.push(new Example(exampleText, soundBuffer, exampleSoundUrl));
      }
    }

    return examples;
  }
}
