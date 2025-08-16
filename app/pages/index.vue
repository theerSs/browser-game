<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <button class="btn btn-accent" @click="authStore.signIn">
    {{ $t("sign-in-with-github") }}
  </button>
</template>
