import { CharacterEntity } from "../domain";

export function doAttack(state: CombatState) {
  if (!state.enemy)
    return;
  const player = new CharacterEntity(state.player);
  const enemy = new CharacterEntity(state.enemy);

  const playerDamage = player.getDamage();
  enemy.applyDamage(playerDamage);

  const enemyDamage = enemy.getDamage();
  player.applyDamage(enemyDamage);
}
