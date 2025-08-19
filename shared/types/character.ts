export type Character = {
  image: string;
  name: string;
  level: number;
  stats: CharacterStats;
  resources: CharacterResources;
};

export type CharacterStats = {
  damage: [number, number];
  defence: number;
  dex: number;
};

export type CharacterResources = {
  energy: CharacterResource;
  health: CharacterResource;
};

export type CharacterResource = {
  current: number;
  max: number;
};
