<script setup lang="ts">
import { ROUTES } from "./const";
</script>

<template>
  <BaseDrawer drawer-id="navigation-drawer">
    <template #main>
      <slot />
    </template>
    <template #sidebar>
      <li v-for="route in ROUTES" :key="route.path">
        <NuxtLink :to="route.path">
          <Icon :name="route.icon" size="24" />
          {{ $t(route.label) }}
        </NuxtLink>
      </li>
    </template>
  </BaseDrawer>
</template>
