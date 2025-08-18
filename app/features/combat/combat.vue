<script setup lang="ts">
import CombatActions from "./components/combat-actions.vue";
import { useCombat } from "./composables/use-combat";

const { combatState, handleCombatAction } = useCombat();

const damageRange = computed(() => `${combatState.value?.player.stats.damage[0]} - ${combatState.value?.player.stats.damage[1]}`);
const dodgeChance = computed(() => {
  if (!combatState.value)
    return "";
  return `${combatState.value.player.stats.dex - combatState.value.enemy.stats.dex}%`;
});
const potionsAmount = computed(() => {
  const potion = combatState.value?.player.inventory.find(({ id }) => id === "potion");
  if (!potion) {
    return 0;
  }

  return potion.amount;
});
</script>

<template>
  <div v-if="combatState" class="flex gap-4">
    <div class="flex flex-col gap-4 flex-1">
      <CharacterPanel
        :name="combatState.player.name"
        :image="combatState.player.image"
        :level="combatState.player.level"
        :resources="combatState.player.resources"
        :img-alt="$t('hero')"
      />
      <CombatActions
        :damage-label="damageRange"
        :defence-label="`${combatState.player.stats.defence}%`"
        :dodge-label="dodgeChance"
        :potions-amount="potionsAmount"
        @action-click="handleCombatAction"
      />
    </div>
    <CharacterPanel
      class="flex-1 h-full"
      :name="combatState.enemy.name"
      :image="combatState.enemy.image"
      :level="combatState.enemy.level"
      :resources="combatState.enemy.resources"
      :img-alt="$t('enemy')"
    />
  </div>
</template>
