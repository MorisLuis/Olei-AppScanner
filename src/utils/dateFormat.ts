import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import { NUMBER_0, NUMBER_1 } from './globalConstants';

const capitalizeProperNouns = (str: string) : string => {
  return str.replace(/\w\S*/g, (word) => {
    if (['de', 'a', 'las'].includes(word.toLowerCase())) {
      return word;
    }
    return word.charAt(NUMBER_0).toUpperCase() + word.slice(NUMBER_1);
  });
};

export const dateFormat = (date: string | undefined) : string | null => {
  if (!date) return null;

  const formattedDate = format(new Date(date), "EEEE, d 'de' MMMM 'de' y", {
    locale: es,
  });

  const formattedDateWithCapitalization = formattedDate
    .split(' ')
    .map(capitalizeProperNouns)
    .join(' ');

  return formattedDateWithCapitalization;
};
