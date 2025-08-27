import type { Character, CharacterStats } from "./character";

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
  items: Array<InventoryItem | null>;
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

export type StatModifier = {
  stat: keyof CharacterStats;
  modifier: number;
};

export type StatRequirement = {
  stat: keyof Omit<CharacterStats, "damage" | "defence">;
  requiredValue: number;
};

export type ItemRequirements = {
  statsRequirements: StatRequirement[];
  requiredLevel: number;
};

export type ItemType = "weapon";

export type InventoryItem = {
  id: string;
  type: ItemType;
  name: string;
  image: string;
  equipped?: boolean;
  statsModifiers?: StatModifier[];
  requirements?: ItemRequirements;
  description: string;
  stackable: boolean;
  maxStack?: number;
  amount: number;
  value: number;
};

export type PlayerCharacterItem = Pick<PlayerCharacter, "id" | "image" | "name" | "level">;

export type CreateCharacterBody = {
  name: string;
};
