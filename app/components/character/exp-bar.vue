<script setup lang="ts">
const props = defineProps<{
  experience: Experience;
}>();
</script>

<template>
  <div class="flex flex-col container items-center">
    <span class="inline-block">
      {{ props.experience.current }}/{{ props.experience.toLevelUp }}
    </span>

    <progress
      class="progress progress-warning h-2"
      :value="props.experience.current"
      :max="props.experience.toLevelUp"
    />
  </div>
</template>
