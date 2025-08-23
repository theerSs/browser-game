<script setup lang="ts">
const characterStore = useCharacterStore();
</script>

<template>
  <div>
    <CharacterPanel
      v-if="characterStore.character"
      image="player"
      :level="characterStore.character.level"
      :name="characterStore.character.name"
      :resources="characterStore.character.resources"
      img-alt="Player character"
    />
  </div>
</template>
