<script setup lang="ts">
import type { Character } from "~~/shared/types/character";

const props = defineProps<Pick<Character, "image" | "level" | "name" | "resources"> & { imgAlt: string }>();
</script>

<template>
  <div class="card card-border bg-base-200">
    <figure class="w-full p-4">
      <img
        class="object-contain w-1/2 min-w-32 rounded-md"
        :src="`/characters/${props.image}.png`"
        :alt="props.imgAlt"
      >
    </figure>
    <div class="card-body items-center">
      <h2 class="card-title">
        {{ $t(props.name) }} - {{ props.level }}
      </h2>
      <div class="container">
        <CharacterResourceBar
          resource-type="health"
          :resource="props.resources.health"
        />
        <CharacterResourceBar
          resource-type="energy"
          :resource="props.resources.energy"
        />
      </div>
    </div>
  </div>
</template>
