import type { CharacterResources, CharacterStats, Inventory } from "~~/shared/types";

import {
  int,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const character = sqliteTable("character", {
  id: text("id").primaryKey(),
  image: text("image").notNull(),
  name: text("name").notNull(),
  level: int("level").notNull(),
  stats: text("stats", { mode: "json" }).$type<CharacterStats>().notNull(),
  resources: text("resources", { mode: "json" }).$type<CharacterResources>().notNull(),
  inventory: text("inventory", { mode: "json" }).$type<Inventory>().notNull(),
  userId: int().notNull().references(() => user.id),
});
