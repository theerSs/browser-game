<script setup lang="ts">
import Stat from "./components/stat.vue";
import { useStatsList } from "./composables/use-stats-list";

const props = defineProps<{
  stats: CharacterStats;
}>();

const { statsList } = useStatsList(toRef(props, "stats"));
</script>

<template>
  <div class="card card-border bg-base-200">
    <div class="card-body">
      <Stat
        v-for="stat in statsList"
        :key="stat.name"
        :name="stat.name"
        :value="stat.value"
      />
    </div>
  </div>
</template>
