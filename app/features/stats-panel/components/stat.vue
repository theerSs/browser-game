<script setup lang="ts">
const props = defineProps<{
  name: string;
  value: string | number;
}>();
</script>

<template>
  <div class="flex items-center gap-4">
    <span class="w-24 truncate font-bold">{{ $t(props.name) }}:</span>
    <span class="italic">{{ props.value }}</span>
  </div>
</template>
