<script setup lang="ts">
import NavigationDrawer from "~/features/navigation/navigation-drawer.vue";
</script>

<template>
  <div class="w-full h-full">
    <NavigationDrawer>
      <slot />
    </NavigationDrawer>
  </div>
</template>
