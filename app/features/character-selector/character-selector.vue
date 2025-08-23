<script setup lang="ts">
import CharacterItem from "./components/character-item.vue";

const { characters, isLoading, deleteCharacter, createCharacter } = useCharactersApi();
const { setCharacter } = useCharacterStore();
</script>

<template>
  <div class="container max-w-xl min-w-60 flex flex-col items-center justify-center gap-4">
    <div class="flex justify-start container">
      <button class="btn btn-primary" @click="createCharacter('Romuald')">
        {{ $t("create_new_character") }}
        <Icon name="tabler:circle-plus" size="24" />
      </button>
    </div>
    <ul class="list bg-base-200 container rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
        {{ $t("your_characters_list") }}
      </li>

      <CharacterItem
        v-for="character in characters"
        :key="character.id"
        :character="character"
        @delete="deleteCharacter(character.id)"
        @play="setCharacter(character.id)"
      />
      <div v-if="isLoading" class="w-full flex justify-center p-2">
        <BaseLoader />
      </div>
    </ul>
  </div>
</template>
