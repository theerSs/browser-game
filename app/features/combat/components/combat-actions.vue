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
    <div class="tooltip" :data-tip="$t('attack')">
      <button class="btn btn-primary w-full" @click="$emit('attack')">
        <Icon name="tabler:sword" size="24" />
        {{ props.damageLabel }}
      </button>
    </div>
    <div class="tooltip" :data-tip="$t('block')">
      <button class="btn btn-accent w-full" @click="$emit('block')">
        <Icon name="tabler:shield" size="24" />
        {{ props.defenceLabel }}
      </button>
    </div>
    <div class="tooltip" :data-tip="$t('dodge')">
      <button class="btn btn-warning w-full" @click="$emit('dodge')">
        <Icon name="tabler:fall" size="24" />
        {{ props.dodgeLabel }}
      </button>
    </div>
  </div>
</template>
