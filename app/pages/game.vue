<script setup lang="ts">
import characterSelection from "~/middleware/character-selection";

definePageMeta({
  layout: "game",
  middleware: [characterSelection],
});

const characterStore = useCharacterStore();
const socketStore = useSocketStore();

onBeforeUnmount(() => {
  characterStore.removeCharacter();
  socketStore.disconnect();
});
</script>

<template>
  <NuxtPage />
</template>
