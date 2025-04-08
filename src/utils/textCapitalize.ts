import { NUMBER_0, NUMBER_1 } from "./globalConstants";

export const capitalizarTexto = (texto: string) : string => {
  const palabras = texto?.split(' ');
  const palabrasCapitalizadas = palabras?.map((palabra) => {
    return palabra.charAt(NUMBER_0).toUpperCase() + palabra.slice(NUMBER_1).toLowerCase();
  });
  return palabrasCapitalizadas?.join(' ');
};
