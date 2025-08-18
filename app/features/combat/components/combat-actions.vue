<script setup lang="ts">
const props = defineProps<{
  damageLabel: string;
  defenceLabel: string;
  dodgeLabel: string;
  potionsAmount: number;
}>();

const emit = defineEmits<{
  actionClick: [action: CombatAction];
}>();

function handleAction(action: CombatAction) {
  emit("actionClick", action);
}
</script>

<template>
  <div class="flex flex-col gap-2 md:flex-row">
    <div class="tooltip" :data-tip="$t('attack')">
      <button class="btn btn-primary w-full" @click="handleAction('attack')">
        <Icon name="tabler:sword" size="24" />
        {{ props.damageLabel }}
      </button>
    </div>
    <div class="tooltip" :data-tip="$t('block')">
      <button class="btn btn-accent w-full" @click="handleAction('defend')">
        <Icon name="tabler:shield" size="24" />
        {{ props.defenceLabel }}
      </button>
    </div>
    <div class="tooltip" :data-tip="$t('dodge')">
      <button class="btn btn-warning w-full" @click="handleAction('dodge')">
        <Icon name="tabler:fall" size="24" />
        {{ props.dodgeLabel }}
      </button>
    </div>
    <div class="tooltip" :data-tip="$t('heal')">
      <button
        :disabled="props.potionsAmount === 0"
        class="btn btn-neutral w-full"
        @click="handleAction('heal')"
      >
        <Icon name="tabler:flask-2" size="24" />
        {{ props.potionsAmount }}
      </button>
    </div>
  </div>
</template>
