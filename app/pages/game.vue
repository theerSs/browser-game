<script setup lang="ts">
import NavigationDrawer from "~/features/navigation/navigation-drawer.vue";
const {connect, disconnect} = useSocketStore();

onMounted(() => {
 connect() 
})

onBeforeUnmount(() => {
  disconnect()
})
</script>

<template>
  <NavigationDrawer>
    <NuxtPage />
  </NavigationDrawer>
</template>
