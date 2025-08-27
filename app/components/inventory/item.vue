<script setup lang="ts">
const props = defineProps<{
  item: InventoryItem | null;
}>();
</script>

<template>
  <div
    class="relative w-[64px] h-[64px] group"
  >
    <div
      class="rounded-md bg-base-200 w-full h-full flex items-center justify-center"
      :class="{
        'border-accent': item?.equipped,
        'border-2': item?.equipped,
      }"
    >
      <img
        v-if="props.item"
        :src="`/items/${props.item.image}`"
        :alt="$t(props.item.name)"
        class="max-w-[90%] max-h-[90%]"
      >
      <div v-if="item?.amount && item.amount > 1" class="absolute bottom-0 right-1 text-xs">
        {{ item.amount }}
      </div>
    </div>

    <InventoryItemDesc v-if="props.item" :item="props.item" />
  </div>
</template>
