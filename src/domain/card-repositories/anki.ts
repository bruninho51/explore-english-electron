import http from 'http';
import CardRepository from '../protocols/card-repository';
import { Card } from '../card';
import { AnkiCardTheme } from '../protocols/anki-card-theme';
import { NoteBuilder } from '../note-builder';
import { AnkiConnectionError } from '../errors/anki-connection-error';

class AnkiRepository implements CardRepository {
  private readonly _deck: string
  private readonly _theme: AnkiCardTheme

  constructor (deck: string, theme: AnkiCardTheme) {
    this._theme = theme;
    this._deck = deck;
  }

  async createDeck (deckName: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      const body = JSON.stringify({
        action: 'createDeck',
        version: 6,
        params: {
          deck: deckName
        }
      });

      const request = http.request({
        host: 'localhost',
        method: 'POST',
        port: 8765,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body)
        }
      }, () => resolve(true));

      request.on('error', () => {
        reject(new AnkiConnectionError());
      });

      request.write(body);

      request.end();
    });
  }

  async getAvailableDecks (): Promise<string[]> {
    const response: string[] = await new Promise((resolve, reject) => {
      let result = '';

      const request = http.request({
        host: 'localhost',
        method: 'POST',
        port: 8765,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(JSON.stringify({
            action: 'deckNames',
            version: 6
          }))
        }
      }, res => {
        res.setEncoding('utf8');
        if (res.statusCode === 200 || res.statusCode === 201) {
          res.on('data', chunk => {
            result = result.concat(chunk);
          });

          res.on('end', () => {
            const ankiResult = JSON.parse(result);
            resolve(ankiResult.result as string[]);
          });
        } else reject(new Error(`Request returned status ${res.statusCode}`));
      });

      request.on('error', () => {
        reject(new AnkiConnectionError());
      });

      request.write(JSON.stringify({
        action: 'deckNames',
        version: 6
      }));

      request.end();
    });

    return response;
  }

  async save (card: Card): Promise<any> {
    const noteBuilder: NoteBuilder = this._theme.getTemplate(this._deck, card);

    const response: any = await new Promise((resolve, reject) => {
      let result = '';
      const params = JSON.stringify(noteBuilder.build());

      const request = http.request({
        host: 'localhost',
        method: 'POST',
        port: 8765,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(params)
        }
      }, res => {
        res.setEncoding('utf8');
        if (res.statusCode === 200 || res.statusCode === 201) {
          res.on('data', chunk => {
            result = result.concat(chunk);
          });

          res.on('end', () => {
            resolve(result);
          });
        } else reject(new Error(`Request returned status ${res.statusCode}`));
      });

      request.write(params);
      request.end();
    });

    if (!response) { throw new AnkiConnectionError(); }

    return response;
  }
}

export default AnkiRepository;
