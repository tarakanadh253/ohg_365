export * from './types';
export { pythonChallenges } from './python-challenges';
export { javaChallenges } from './java-challenges';
export { javascriptChallenges } from './javascript-challenges';
export { sqlChallenges } from './sql-challenges';

import { pythonChallenges } from './python-challenges';
import { javaChallenges } from './java-challenges';
import { javascriptChallenges } from './javascript-challenges';
import { sqlChallenges } from './sql-challenges';
import { LanguageChallenge } from './types';

export const allChallenges: LanguageChallenge[] = [
  pythonChallenges,
  javaChallenges,
  javascriptChallenges,
  sqlChallenges,
];

export const getChallengeByLanguage = (language: string): LanguageChallenge | undefined => {
  return allChallenges.find(c => c.language === language);
};

export const getLanguageOptions = () => {
  return allChallenges.map(c => ({
    value: c.language,
    label: c.displayName,
    icon: c.icon,
    color: c.color,
  }));
};

