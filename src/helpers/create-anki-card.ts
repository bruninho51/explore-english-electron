import { Card } from '../domain/card';
import AnkiRepository from '../domain/card-repositories/anki';
import { DefaultAnkiCardTheme } from '../domain/card-themes/anki-card-theme';
import CardRepository from '../domain/protocols/card-repository';
import { SentenceWordGetterUC } from '../domain/usecases/protocols/sentence-word-getter-uc';
import { SentenceWordGetter } from '../domain/usecases/sentence-word-getter';
import { Sentence as SentenceEntity } from '../domain/sentence';
import { CreateAnkiCardParams } from './@types/create-anki-cards-params.type';

export const createAnkiCard = async (params: CreateAnkiCardParams): Promise<string> => {
  const { dictionary, phrase, deckName } = params;
  const sentenceWordGetter: SentenceWordGetterUC = new SentenceWordGetter();
  const repository: CardRepository = new AnkiRepository(deckName, new DefaultAnkiCardTheme());

  try {
    await repository.createDeck(deckName);
    const sentenceEntity = new SentenceEntity(phrase, dictionary, sentenceWordGetter);
    const card: Card = await sentenceEntity.searchForWord();
    await card.save(repository);
    return await Promise.resolve(phrase.id);
  } catch (error) {
    return await Promise.reject(error);
  }
};
