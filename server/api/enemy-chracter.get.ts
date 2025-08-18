import type { EnemyCharacter } from "~~/shared/types";

import { ENEMIES } from "~~/shared/const";

export default defineEventHandler((): EnemyCharacter => {
  return ENEMIES[0];
});
