<script setup lang="ts">
import type { Alert } from "~/types";

const props = defineProps<{
  alert: Alert | null;
}>();
</script>

<template>
  <Transition
    name="fade-slide"
    appear
  >
    <div
      v-if="props.alert"
      role="alert"
      :class="[`alert-${props.alert.type}`]"
      class="alert alert-soft fixed bottom-5 right-5 w-fit z-10"
    >
      <span>{{ $t(props.alert.message) }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateX(200%);
}
</style>
