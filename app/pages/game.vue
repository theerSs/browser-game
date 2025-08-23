<script setup lang="ts">
definePageMeta({
  layout: "game",
});

const { connect, disconnect } = useSocketStore();

onMounted(() => {
  connect();
});

onBeforeUnmount(() => {
  disconnect();
});
</script>

<template>
  <NuxtPage />
</template>
