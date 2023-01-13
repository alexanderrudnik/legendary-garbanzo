export const getPlural = (value: string, word: string) =>
  parseFloat(value) === 1 ? word : `${word}s`;
