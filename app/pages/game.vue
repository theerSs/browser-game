<script setup lang="ts">
import characterSelection from "~/middleware/character-selection";

definePageMeta({
  layout: "game",
  middleware: [characterSelection],
});
</script>

<template>
  <NuxtPage />
</template>
