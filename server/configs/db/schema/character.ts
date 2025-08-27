import type { Experience, Inventory } from "~~/shared/types";

import { generateItem } from "~~/shared/const/items/item";
import {
  int,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

import { user } from "./auth";

const emptyInventory = Array.from({ length: 18 }) as Inventory["items"];
emptyInventory[0] = generateItem();
export const character = sqliteTable("character", {
  id: text("id").default(uuidv4()).primaryKey(),
  image: text("image").default("player").notNull(),
  name: text("name").notNull(),
  level: int("level").default(1).notNull(),
  experience: text("experience", { mode: "json" }).$type<Experience>().default({ current: 0, toLevelUp: 100 }).notNull(),
  stats: text("stats", { mode: "json" }).$type<CharacterStats>().default({
    damage: [5, 9],
    defence: 3,
    dex: 4,
  }).notNull(),
  resources: text("resources", { mode: "json" }).$type<CharacterResources>().default({
    energy: {
      current: 15,
      max: 15,
    },
    health: {
      current: 30,
      max: 30,
    },
  }).notNull(),
  inventory: text("inventory", { mode: "json" }).$type<Inventory>().default({
    potions: {
      health: {
        name: "health_potion",
        amount: 2,
        healAmount: 0.2,
      },
      energy: {
        name: "energy_potion",
        amount: 2,
        healAmount: 0.1,
      },
    },
    gold: 100,
    items: emptyInventory,
  }).notNull(),
  userId: int().notNull().references(() => user.id),
});
