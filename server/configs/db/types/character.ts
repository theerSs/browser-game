import type { PlayerCharacter } from "~~/shared/types";

export type DBCharacter = PlayerCharacter & { userId: number };
