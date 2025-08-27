<script setup lang="ts">
const props = defineProps<{
  iconName: string;
  label: string | number;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <Icon
      :name="props.iconName"
      size="24"
    />
    <span class="text-white">
      {{ props.label }}
    </span>
  </div>
</template>
