import type { Character } from "./character";

export type PlayerCharacter = Character & {
  id: string;
  inventory: Inventory;
};

export type Inventory = {
  potions: Potions;
  gold: number;
  items: InventoryItem[];
};

export type Potions = {
  health: Potion;
  energy: Potion;
};

export type Potion = {
  name: string;
  amount: number;
  healAmount: number;
};

export type InventoryItem = {
  id: string;
  name: string;
  descritpion: string;
  amount: number;
};
