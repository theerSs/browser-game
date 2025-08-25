import { CharacterEntity, PlayerCharacterEntity } from "../domain";

export function doDodge(state: CombatState) {
  const player = new PlayerCharacterEntity(state.player);
  const enemy = new CharacterEntity(state.enemy);

  const enemyDamage = enemy.getDamage();

  player.dodge(enemyDamage, enemy.state.stats.dex);
}
