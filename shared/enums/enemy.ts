export const Enemy = {
  GOBLIN: "goblin",
  SKELETON: "skeleton",
  BAT: "bat",
} as const;

export type Enemy = typeof Enemy[keyof typeof Enemy];
