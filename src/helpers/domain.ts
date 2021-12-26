export const extractWordsFromSentence = (sentence: string): string[] => {
  return sentence.split(' ').map((word: string) => word.trim()).filter(word => !!word);
};
