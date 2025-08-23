<script setup lang="ts">
import characterSelection from "~/middleware/character-selection";

definePageMeta({
  layout: "game",
  middleware: [characterSelection],
});

const characterStore = useCharacterStore();

onBeforeUnmount(() => {
  characterStore.removeCharacter();
});
</script>

<template>
  <NuxtPage />
</template>
