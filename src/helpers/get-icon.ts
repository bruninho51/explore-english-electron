import path from 'path';

export const getIcon = (iconName: string): string => {
  return path.join(__dirname, '..', 'icons', `${iconName}.png`);
};
