import type { InventoryItem, ItemType } from "~~/shared/types";

import type { CharacterEntity } from "./character";

export class InventoryItemEntity {
  constructor(private data: InventoryItem) {}

  get modifiers() {
    return this.data.statsModifiers;
  }

  isEquipable(): boolean {
    const equipableTypes: ItemType[] = ["weapon"];
    return equipableTypes.includes(this.data.type);
  }

  canBeEquippedBy(character: CharacterEntity): boolean {
    if (!this.data.requirements)
      return true;

    const levelOk = character.level >= this.data.requirements.requiredLevel;
    const statsOk = this.data.requirements.statsRequirements.every(req =>
      character.stats[req.stat] >= req.requiredValue,
    );

    return levelOk && statsOk;
  }

  equip() {
    this.data.equipped = true;
  }
}
