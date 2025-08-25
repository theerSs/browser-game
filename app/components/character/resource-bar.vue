<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  resourceType: "health" | "energy";
  resource: CharacterResource;
}>();

const changeAmount = ref<number | null>(null);

watch(() => props.resource.current, (newValue, oldValue) => {
  const delta = newValue - oldValue;
  if (delta !== 0) {
    changeAmount.value = delta;

    setTimeout(() => {
      changeAmount.value = null;
    }, 300);
  }
});
</script>

<template>
  <div class="flex container items-center gap-2 relative">
    <span class="inline-block min-w-18 text-center">
      {{ props.resource.current }}/{{ props.resource.max }}
    </span>

    <transition name="float-up">
      <span
        v-if="changeAmount !== null"
        class="absolute left-4 font-bold"
        :class="{
          'text-green-500': changeAmount > 0,
          'text-red-500': changeAmount < 0,
        }"
      >
        {{ changeAmount > 0 ? '+' : '' }}{{ changeAmount }}
      </span>
    </transition>

    <progress
      :class="{
        'progress-success': props.resourceType === 'health',
        'progress-warning': props.resourceType === 'energy',
      }"
      class="progress flex-1 h-3"
      :value="props.resource.current"
      :max="props.resource.max"
    />
  </div>
</template>

<style scoped>
.float-up-enter-from {
  opacity: 0;
  transform: translateY(0);
}

.float-up-enter-to,
.float-up-leave-from {
  opacity: 1;
  transform: translateY(-30px);
}

.float-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.float-up-enter-active,
.float-up-leave-active {
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
}
</style>
