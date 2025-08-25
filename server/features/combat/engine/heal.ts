import { PlayerCharacterEntity } from "../domain";

export function doHeal(state: CombatState) {
  const player = new PlayerCharacterEntity(state.player);
  player.heal();
}
