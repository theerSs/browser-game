<script setup lang="ts">
import InventoryGrid from "./components/inventory-grid.vue";
import Pouch from "./components/pouch.vue";

const props = defineProps<{
  inventory: Inventory;
}>();

const socketStore = useSocketStore();

function handleItemEquip(itemId: InventoryItem["id"]) {
  socketStore.socket?.emit("character:equip", itemId);
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <Pouch :potions="props.inventory.potions" :gold-amount="props.inventory.gold" />
    <InventoryGrid :items="props.inventory.items" @equip-item="handleItemEquip" />
  </div>
</template>
