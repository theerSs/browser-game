<script setup lang="ts">
const props = defineProps<{
  damageLabel: string;
  defenceLabel: string;
  dodgeLabel: string;
}>();

defineEmits(["attack", "block", "dodge"]);
</script>

<template>
  <div class="flex flex-col gap-2 md:flex-row">
    <button class="btn btn-primary" @click="$emit('attack')">
      <Icon name="tabler:sword" size="24" />
      {{ props.damageLabel }}
    </button>
    <button class="btn btn-accent" @click="$emit('block')">
      <Icon name="tabler:shield" size="24" />
      {{ props.defenceLabel }}
    </button>
    <button class="btn btn-warning" @click="$emit('dodge')">
      <Icon name="tabler:fall" size="24" />
      {{ props.dodgeLabel }}
    </button>
  </div>
</template>
