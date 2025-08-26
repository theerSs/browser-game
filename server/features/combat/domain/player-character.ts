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

    const missingExp = experience.toLevelUp - experience.current;
    if (missingExp <= expGained) {
      this.state.level++;
      this.state.experience.current = expGained - missingExp;
      this.state.experience.toLevelUp *= 2;
      this.state.resources.health.max *= 2;
      this.state.resources.health.current = this.state.resources.health.max;
      this.state.resources.energy.max *= 2;
      this.state.resources.energy.current = this.state.resources.energy.max;
    }
    else {
      this.state.experience.current += expGained;
    }
  }

  addGold(amount: number) {
    this.state.inventory.gold += amount;
  }
}
