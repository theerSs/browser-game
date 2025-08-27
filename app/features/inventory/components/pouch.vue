<script setup lang="ts">
const props = defineProps<{
  potions: Potions;
  goldAmount: number;
}>();
</script>

<template>
  <div class="flex gap-2">
    <BaseIconWithLabel
      icon-name="tabler:flask-2-filled"
      :label="props.potions.health.amount"
      class="text-green-500"
    />
    <BaseIconWithLabel
      icon-name="tabler:flask-filled"
      :label="props.potions.energy.amount"
      class="text-blue-500"
    />
    <BaseIconWithLabel
      icon-name="tabler:coins"
      :label="props.goldAmount"
      class="text-amber-500"
    />
  </div>
</template>
