<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <button class="btn btn-accent" @click="authStore.signIn">
    Sign In With Github
  </button>
</template>
