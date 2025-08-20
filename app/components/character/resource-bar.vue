<script setup lang="ts">
import type { CharacterResource } from "~~/shared/types/entities/character";

const props = defineProps<{
  resourceType: "health" | "energy";
  resource: CharacterResource;
}>();
</script>

<template>
  <div class="flex container items-center gap-2">
    <span class="inline-block min-w-18 text-center">{{ props.resource.current }}/{{ props.resource.max }}</span>
    <progress
      :class="{
        'progress-success': props.resourceType === 'health',
        'progress-warning': props.resourceType === 'energy',
      }"
      class="progress progress-success flex-1 h-3"
      :value="props.resource.current"
      :max="props.resource.max"
    />
  </div>
</template>
