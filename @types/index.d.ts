import { Sentence } from '../src/domain/models/sentence';

declare global{
  const electron: {
    openSrt: (setState: Function) => void
    openVideo: (setState: Function) => void
    exportMovieData: (movieName: string, sentences: Sentence[]) => Promise<void>
  };
}

export {};
