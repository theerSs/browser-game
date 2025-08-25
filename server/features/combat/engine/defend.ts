import { CharacterEntity, PlayerCharacterEntity } from "../domain";

export function doDefend(state: CombatState) {
  const enemy = new CharacterEntity(state.enemy);
  const player = new PlayerCharacterEntity(state.player);

  const enemyDamage = enemy.getDamage();
  player.block(enemyDamage);
}
