<script setup lang="ts">
const authStore = useAuthStore();
authStore.init();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
