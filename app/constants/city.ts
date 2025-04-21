export const ANCHORAGE = 'anchorage';
export const BANGKOK = 'bangkok';
export const BEIJING = 'beijing';
export const BERLIN = 'berlin';
export const BRISBANE = 'brisbane';
export const CALGARY = 'calgary';
export const CARACAS = 'caracas';
export const CHICAGO = 'chicago';
export const HONG_KONG = 'hong kong';
export const ISTANBUL = 'istanbul';
export const KUALA_LUMPUR = 'kuala lumpur';
export const LAGOS = 'lagos';
export const LAHORE = 'lahore';
export const LIMA = 'lima';
export const MADRID = 'madrid';
export const MIAMI = 'miami';
export const MOSCOW = 'moscow';
export const MUMBAI = 'mumbai';
export const NANJING = 'nanjing';
export const NEW_YORK = 'new york';
export const PARIS = 'paris';
export const RIYADH = 'riyadh';
export const SAPPORO = 'sapporo';
export const SYDNEY = 'sydney';
export const TOKYO = 'tokyo';
export const TORONTO = 'toronto';
export const WUHAN = 'wuhan';

export type City = (
  typeof ANCHORAGE |
  typeof BANGKOK |
  typeof BEIJING |
  typeof BERLIN |
  typeof BRISBANE |
  typeof CALGARY |
  typeof CARACAS |
  typeof CHICAGO |
  typeof HONG_KONG |
  typeof ISTANBUL |
  typeof KUALA_LUMPUR |
  typeof LAGOS |
  typeof LAHORE |
  typeof LIMA |
  typeof MADRID |
  typeof MIAMI |
  typeof MOSCOW |
  typeof MUMBAI |
  typeof NANJING |
  typeof NEW_YORK |
  typeof PARIS |
  typeof RIYADH |
  typeof SAPPORO |
  typeof SYDNEY |
  typeof TOKYO |
  typeof TORONTO |
  typeof WUHAN
);

const Cities: City[] = [
  ANCHORAGE,
  BANGKOK,
  BEIJING,
  BERLIN,
  BRISBANE,
  CALGARY,
  CARACAS,
  CHICAGO,
  HONG_KONG,
  ISTANBUL,
  KUALA_LUMPUR,
  LAGOS,
  LAHORE,
  LIMA,
  MADRID,
  MIAMI,
  MOSCOW,
  MUMBAI,
  NANJING,
  NEW_YORK,
  PARIS,
  RIYADH,
  SAPPORO,
  SYDNEY,
  TOKYO,
  TORONTO,
  WUHAN
];

export type CityKey = keyof typeof Cities;

export default Cities;