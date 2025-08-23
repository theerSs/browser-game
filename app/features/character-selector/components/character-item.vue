<script setup lang="ts">
import type { PlayerCharacterItem } from "~~/shared/types/player";

const props = defineProps<{
  character: PlayerCharacterItem;
}>();

defineEmits(["delete", "play"]);
</script>

<template>
  <li
    class="list-row"
  >
    <div><img class="size-15 rounded-box object-cover" src="/characters/player.png"></div>
    <div>
      <div>{{ props.character.name }} - {{ props.character.level }}</div>
      <div class="text-xs uppercase font-semibold opacity-60">
        Warrior
      </div>
    </div>
    <div class="tooltip" :data-tip="$t('play_character')">
      <button class="btn btn-square btn-ghost text-success" @click="$emit('play')">
        <Icon name="tabler:player-play" size="24" />
      </button>
    </div>
    <div
      class="tooltip"
      :data-tip="$t('delete_character')"
    >
      <button class="btn btn-square btn-ghost text-error" @click="$emit('delete')">
        <Icon name="tabler:trash" size="24" />
      </button>
    </div>
  </li>
</template>
