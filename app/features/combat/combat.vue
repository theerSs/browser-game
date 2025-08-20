<script setup lang="ts">
import CombatActions from "./components/combat-actions.vue";
import { useCombat } from "./composables/use-combat";

const { combatState, handleCombatAction, continueCombat, goBackToCity } = useCombat();

const damageRange = computed(() => `${combatState.value?.player.stats.damage[0]} - ${combatState.value?.player.stats.damage[1]}`);
const dodgeChance = computed(() => {
  if (!combatState.value)
    return "";
  return `${combatState.value.player.stats.dex - combatState.value.enemy.stats.dex}%`;
});
</script>

<template>
  <div v-if="combatState" class="flex gap-4">
    <BaseModal
      v-if="combatState.status === 'victory'"
      :title="$t('should_continue_title')"
      :description="$t('should_continue_desc')"
      :close-label="$t('return_to_city')"
      :confirm-label="$t('go_deeper')"
      @confirm-click="continueCombat"
      @cancel-click="goBackToCity"
    />
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
        :potions-amount="combatState.player.inventory.potions.health.amount"
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
  <BaseLoader v-else />
</template>
