<script setup lang="ts">
const props = defineProps<{
  item: InventoryItem;
}>();
</script>

<template>
  <div
    class="fixed z-50 hidden group-hover:block pointer-events-none -translate-x-1/2 mt-2 p-3 rounded-lg shadow-lg bg-base-300 opacity-90 w-64"
  >
    <h2 class="font-bold text-lg text-primary mb-1">
      {{ $t(props.item.name) }}
    </h2>

    <p class="text-sm italic text-base-content/80 mb-2">
      {{ $t(props.item.description) }}
    </p>

    <div v-if="props.item.statsModifiers?.length" class="mb-2">
      <h3 class="font-semibold">
        {{ $t('modifiers') }}
      </h3>
      <div class="text-sm">
        <div
          v-for="mod in props.item.statsModifiers"
          :key="mod.stat"
          class="flex"
          :class="{
            'text-error': mod.modifier < 0,
            'text-success': mod.modifier > 0,
          }"
        >
          <span class="w-24">
            {{ $t(mod.stat) }}
          </span>
          <span>
            {{ mod.modifier > 0 ? `+${mod.modifier}` : mod.modifier }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="props.item.requirements" class="mb-2">
      <h3 class="font-semibold">
        {{ $t("requirements") }}
      </h3>
      <ul class="text-sm list-disc list-inside">
        <li v-for="req in props.item.requirements.statsRequirements" :key="req.stat">
          {{ req.stat }} ≥ {{ req.requiredValue }}
        </li>
        <li>{{ $t("level") }} ≥ {{ props.item.requirements.requiredLevel }}</li>
      </ul>
    </div>

    <div class="text-sm font-semibold text-warning">
      {{ $t('value') }}: {{ props.item.value }}
    </div>
  </div>
</template>
