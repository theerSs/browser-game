import type { InventoryItem, PlayerCharacter } from "~~/shared/types";

import { InventoryItemEntity } from "./inventory-item";

export class CharacterEntity {
  constructor(private data: PlayerCharacter) {}

  get raw() {
    return this.data;
  }

  get stats() {
    return this.data.stats;
  }

  get level() {
    return this.data.level;
  }

  findInventoryItemById(itemId: InventoryItem["id"]): InventoryItemEntity | undefined {
    const item = this.data.inventory.items.find(item => item?.id === itemId);
    return item ? new InventoryItemEntity(item) : undefined;
  }

  equip(item: InventoryItemEntity): boolean {
    if (!item.isEquipable || !item.canBeEquippedBy(this))
      return false;

    // TODO: WiP. The base stat shouldn't be modified at all.
    item.modifiers?.forEach(({ modifier, stat }) => {
      const characterStat = this.data.stats[stat];

      if (Array.isArray(characterStat)) {
        characterStat[0] += modifier;
        characterStat[1] += modifier;
      }
      else {
        (this.data.stats[stat] as number) += modifier;
      }
    });

    item.equip();
    return true;
  }
}
