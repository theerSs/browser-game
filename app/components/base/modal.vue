<script setup lang="ts">
const props = defineProps<{
  closeLabel: string;
  confirmLabel: string;
  title: string;
  description: string;
}>();

defineEmits(["cancelClick", "confirmClick"]);
</script>

<template>
  <dialog class="modal modal-open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">
        {{ props.title }}
      </h3>
      <p class="py-4">
        {{ props.description }}
      </p>
      <div class="modal-action flex gap-2">
        <button class="btn btn-ghost" @click="$emit('cancelClick')">
          {{ props.closeLabel }}
        </button>
        <button class="btn btn-primary" @click="$emit('confirmClick')">
          {{ props.confirmLabel }}
        </button>
      </div>
    </div>
  </dialog>
</template>
