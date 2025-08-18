import type { Character } from "./character";

export type PlayerCharacter = Character & {
  inventory: InventoryItem[];
};

export type InventoryItem = {
  id: string;
  name: string;
  amount: number;
};
