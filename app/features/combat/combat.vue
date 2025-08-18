<script setup lang="ts">
import CombatActions from "./components/combat-actions.vue";

const { data: player } = await useCsrfFetch<Character>("/api/player-character");
const { data: enemy } = await useCsrfFetch<Character>("/api/enemy-chracter");
</script>

<template>
  <div v-if="player && enemy" class="flex gap-4">
    <div class="flex flex-col gap-4 flex-1">
      <CharacterPanel
        :name="player.name"
        :image="player.image"
        :level="player.level"
        :resources="player.resources"
        :img-alt="$t('hero')"
      />
      <CombatActions
        :damage-label="`${player.stats.damage[0]} - ${player.stats.damage[1]}`"
        :defence-label="`${player.stats.defence}%`"
        :dodge-label="`${player.stats.dex - enemy.stats.dex}%`"
      />
    </div>
    <CharacterPanel
      class="flex-1 h-full"
      :name="enemy.name"
      :image="enemy.image"
      :level="enemy.level"
      :resources="enemy.resources"
      :img-alt="$t('enemy')"
    />
  </div>
</template>
