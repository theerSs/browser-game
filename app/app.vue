<script setup lang="ts">
const authStore = useAuthStore();
authStore.init();
const alertStore = useAlertStore();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <BaseAlert :alert="alertStore.alert" />
  </NuxtLayout>
</template>
