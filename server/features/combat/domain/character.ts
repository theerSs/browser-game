import _ from "lodash";

export class CharacterEntity {
  constructor(public state: Character) {}

  applyDamage(amount: number) {
    this.state.resources.health.current = Math.max(
      0,
      this.state.resources.health.current - amount,
    );
  }

  getDamage(): number {
    return _.random(this.state.stats.damage[0], this.state.stats.damage[1]);
  }
}
