import type { Character } from "./character";

export type PlayerCharacter = Character & {
  id: string;
  inventory: Inventory;
  experience: Experience;
};

export type Experience = {
  current: number;
  toLevelUp: number;
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
  description: string;
  amount: number;
};

export type PlayerCharacterItem = Pick<PlayerCharacter, "id" | "image" | "name" | "level">;

export type CreateCharacterBody = {
  name: string;
};
