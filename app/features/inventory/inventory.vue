<script setup lang="ts">
import Pouch from "./components/pouch.vue";

const props = defineProps<{
  inventory: Inventory;
}>();
</script>

<template>
  <div>
    <Pouch :potions="props.inventory.potions" :gold-amount="props.inventory.gold" />
  </div>
</template>
