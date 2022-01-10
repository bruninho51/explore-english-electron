import { Card } from '../card';
import { NoteBuilder } from '../note-builder';

export interface AnkiCardTheme {
  getTemplate: (deck: string, card: Card) => NoteBuilder
}
