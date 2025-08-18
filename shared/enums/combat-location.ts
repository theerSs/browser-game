export const CombatLocation = {
  FOREST: "forest",
} as const;

export type CombatLocation = typeof CombatLocation[keyof typeof CombatLocation];
