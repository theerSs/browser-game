import { CharacterEntity } from "./character";

export class PlayerCharacterEntity extends CharacterEntity {
  constructor(public state: PlayerCharacter) {
    super(state);
  }

  heal() {
    const potion = this.state.inventory.potions.health;
    if (potion.amount === 0)
      return;

    const healAmount = Math.floor(this.state.resources.health.max * potion.healAmount);
    this.state.resources.health.current = Math.min(
      this.state.resources.health.max,
      this.state.resources.health.current + healAmount,
    );
    this.state.inventory.potions.health.amount--;
  }

  dodge(damage: number, targetDex: number) {
    const rawChance = (this.state.stats.dex - targetDex) / 100;
    const dodgeChance = Math.max(0.05, Math.min(1, rawChance));
    const roll = Math.random();

    if (roll >= dodgeChance) {
      super.applyDamage(damage);
    }
  }

  block(damage: number) {
    const defenceModifier = Math.max(0.05, this.state.stats.defence / 100);
    const modifiedDamge = Math.floor(damage - (damage * defenceModifier));
    super.applyDamage(modifiedDamge);
  }

  levelUp(expGained: number) {
    const experience = this.state.experience;
    const resources = this.state.resources;
    const stats = this.state.stats;

    const totalExp = experience.current + expGained;

    if (totalExp >= experience.toLevelUp) {
      this.state.level++;

      experience.current = totalExp - experience.toLevelUp;
      experience.toLevelUp = Math.floor(experience.toLevelUp * 1.5);

      stats.damage[0] += this.state.level * 1.2;
      stats.damage[1] += this.state.level * 1.2;
      stats.defence += Math.floor(this.state.level / 2);
      stats.dex += Math.floor(this.state.level / 3);

      resources.health.max = Math.floor(resources.health.max * 1.2);
      resources.health.current = resources.health.max;
      resources.energy.max += this.state.level * 1.1;
      resources.energy.current = resources.energy.max;
    }
    else {
      experience.current = totalExp;
    }
  }

  addGold(amount: number) {
    this.state.inventory.gold += amount;
  }
}
