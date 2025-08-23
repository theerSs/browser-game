export const useCharacterStore = defineStore("useCharacterStore", () => {
  const character = ref<PlayerCharacter | null>(null);
  const socketStore = useSocketStore();

  function setCharacter(characterId: PlayerCharacter["id"]) {
    if (!socketStore.socket) {
      return;
    }

    socketStore.socket.emit("character:listen", characterId);
    socketStore.socket.on("character:updated", (playerCharacter: PlayerCharacter) => {
      character.value = playerCharacter;
    });
  }

  watch(character, (newCharacter) => {
    if (!newCharacter)
      return;

    navigateTo("/game/character");
  });

  onUnmounted(() => {
    if (!socketStore.socket) {
      return;
    }

    socketStore.socket.off("character:updated");
  });

  return { setCharacter };
});
