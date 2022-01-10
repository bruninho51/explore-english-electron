import { Card } from '../card';
import { Definition } from '../definition';
import { Example } from '../example';
import { GrammarClass } from '../grammar-class';
import { NoteBuilder } from '../note-builder';
import { Pronunciation } from '../pronunciation';
import { AnkiCardTheme } from '../protocols/anki-card-theme';
import { Sentence } from '../sentence';

export class DefaultAnkiCardTheme implements AnkiCardTheme {
  getTemplate (deck: string, card: Card): NoteBuilder {
    const sentence: Sentence = card.children.filter(child => child instanceof Sentence)[0] as unknown as Sentence;
    const pronunciation: Pronunciation = card.children.filter(child => child instanceof Pronunciation)[0] as unknown as Pronunciation;
    const grammarClassesElements = card.children.filter(child => child instanceof GrammarClass);
    const grammarClasses = grammarClassesElements.map(gC => gC as unknown as GrammarClass);

    const noteBuilder = new NoteBuilder();
    noteBuilder.addNote({
      deckName: deck,
      modelName: 'Basic'
    }).fields({
      Front: sentence.sentence,
      Back: this.buildBackString(pronunciation, grammarClasses)
    }).options({
      allowDuplicate: true
    }).audio([
      {
        url: pronunciation.soundUrl,
        filename: `${Date.now()}.mp3`,
        fields: ['Front', 'Back']
      }
    ]);
    return noteBuilder;
  }

  buildBackString (pronunction: Pronunciation, grammarClasses: GrammarClass[]): string {
    let finalString = `<b>${pronunction.pronunciation}</b><br><br>`;

    grammarClasses.forEach(gC => {
      finalString += `<b>${gC.grammarClass}</b><br>`;

      const definition: Definition | undefined = gC.children.find(c => c instanceof Definition) as unknown as Definition;
      finalString += `${definition ? definition.definition : 'Definition not found'}<br>`;

      const example: Example[] = gC.children.filter(c => c instanceof Example) as unknown as Example[];
      example.forEach((e, i) => {
        finalString += `${e.example}<br>`;

        if (i === example.length - 1) {
          finalString += '<br>';
          finalString += '<br>';
        }
      });
    });

    return finalString;
  }
}
