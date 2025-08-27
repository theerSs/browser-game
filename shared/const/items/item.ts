import type { InventoryItem } from "~~/shared/types";

import { v4 as uuidv4 } from "uuid";

export const ITEMS: InventoryItem[] = [
  {
    id: "sword_001",
    type: "weapon",
    name: "Iron Sword",
    image: "sword.png",
    description: "A reliable iron sword. Ideal for beginner adventurers.",
    stackable: false,
    amount: 1,
    value: 150,
    statsModifiers: [
      {
        stat: "damage",
        modifier: 4,
      },
      {
        stat: "dex",
        modifier: -1,
      },
    ],
    requirements: {
      requiredLevel: 1,
      statsRequirements: [],
    },
  },
];

export function generateItem(): InventoryItem {
  const item: InventoryItem = {
    ...ITEMS[0] as InventoryItem,
    id: uuidv4(),
  };
  return item;
}
