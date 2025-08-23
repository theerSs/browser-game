import type { PlayerCharacter } from "~~/shared/types/player";

export const useCharacterStore = defineStore("useCharacterStore", () => {
  const character = ref<PlayerCharacter | null>(null);
  const socketStore = useSocketStore();

  function removeSocketListeners() {
    socketStore.socket?.off("character:updated");
  }

  function setCharacter(characterId: PlayerCharacter["id"]) {
    if (!socketStore.socket) {
      return;
    }

    removeSocketListeners();

    socketStore.socket.emit("character:listen", characterId);
    socketStore.socket.on("character:updated", (playerCharacter: PlayerCharacter) => {
      character.value = playerCharacter;
    });
  }

  function removeCharacter() {
    character.value = null;
    removeSocketListeners();
  }

  watch(character, (newCharacter, oldCharacter) => {
    if (!newCharacter)
      return;

    if (!oldCharacter || newCharacter.id !== oldCharacter.id) {
      navigateTo("/game/character");
    }
  });

  return { character, setCharacter, removeCharacter };
});
