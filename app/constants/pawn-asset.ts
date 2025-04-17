export const ASSET_GOLD_CHAIN = 'gold-chain';
export const ASSET_CHAIN_LINK_BELT = 'chain-link-belt';
export const ASSET_PLAYSTATION_3 = 'playstation-3';
export const ASSET_MICRO_FRIDGE = 'micro-fridge';
export const ASSET_MINI_FRIDGE = 'mini-fridge';

export type ASSET_NAME = (
  typeof ASSET_GOLD_CHAIN |
  typeof ASSET_CHAIN_LINK_BELT |
  typeof ASSET_PLAYSTATION_3 |
  typeof ASSET_MICRO_FRIDGE |
  typeof ASSET_MINI_FRIDGE
);

export const Assets = [
  ASSET_GOLD_CHAIN,
  ASSET_CHAIN_LINK_BELT,
  ASSET_PLAYSTATION_3,
  ASSET_MICRO_FRIDGE,
  ASSET_MINI_FRIDGE,
];

export interface PawnAsset {
  id: ASSET_NAME,
  title: string,
  buyPrice: number,
  sellPrice: number,
  description: string,
}

export const PawnAssets: PawnAsset[] = [
  {
    id: ASSET_GOLD_CHAIN,
    title: 'Gold Chain',
    buyPrice: 1000,
    sellPrice: 200,
    description: 'Extra thin gold chain. Pretty sweet.',
  },
  {
    id: ASSET_CHAIN_LINK_BELT,
    title: 'Chain Link Belt',
    buyPrice: 50,
    sellPrice: 10,
    description: 'Large chain links that somehow fit within belt loops.',
  },
  {
    id: ASSET_PLAYSTATION_3,
    title: 'PlayStation™ 3',
    buyPrice: 300,
    sellPrice: 100,
    description: 'It\'s an old system, but still hooks up to most TVs.',
  },
  {
    id: ASSET_MICRO_FRIDGE,
    title: 'Micro Fridge',
    buyPrice: 500,
    sellPrice: 300,
    description: 'It fits 4 cans, fits on a desk, and is powered by USB.',
  },
  {
    id: ASSET_MINI_FRIDGE,
    title: 'Mini Fridge',
    buyPrice: 900,
    sellPrice: 300,
    description: 'An ok little fridge, but honestly it can\'t fit much.',
  },
];

export function assetFor(name: ASSET_NAME): (PawnAsset | void) {
  return PawnAssets.find((p) => {
    return p.id === name;
  });
}