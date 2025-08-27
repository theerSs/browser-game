<script setup lang="ts">
import Inventory from "~/features/inventory/inventory.vue";
import StatsPanel from "~/features/stats-panel/stats-panel.vue";

const characterStore = useCharacterStore();
</script>

<template>
  <div v-if="characterStore.character" class="flex gap-4">
    <div class="flex flex-col flex-1 gap-2">
      <CharacterPanel
        image="player"
        :level="characterStore.character.level"
        :name="characterStore.character.name"
        :experience="characterStore.character.experience"
        :resources="characterStore.character.resources"
        img-alt="Player character"
      />
      <StatsPanel :experience="characterStore.character.experience" :stats="characterStore.character.stats" />
    </div>
    <Inventory :inventory="characterStore.character.inventory" class="flex-1" />
  </div>
  <BaseLoader v-else />
</template>
