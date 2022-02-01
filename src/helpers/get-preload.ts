import path from 'path';

export const getPreload = (preloadName: string): string => {
  return path.resolve(__dirname, `${preloadName}.js`);
};
