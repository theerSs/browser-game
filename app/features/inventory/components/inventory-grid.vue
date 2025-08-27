<script setup lang="ts">
const props = defineProps<{
  items: Inventory["items"];
}>();

defineEmits<{
  equipItem: [item: InventoryItem["id"]];
}>();
</script>

<template>
  <div class="flex flex-wrap gap-1 max-w-lg">
    <InventoryItem
      v-for="(item, index) in props.items"
      :key="index"
      :item="item"
      @click="item && $emit('equipItem', item.id)"
    />
  </div>
</template>
