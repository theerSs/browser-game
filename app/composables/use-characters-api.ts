export function useCharactersApi() {
  const charactersReq = useCsrfFetch<PlayerCharacterItem[]>("/api/player/characters");
  const { $csrfFetch } = useNuxtApp();
  const { performAction, isPending } = useApiRequest();

  const isLoading = computed(() => !charactersReq.data.value || isPending.value);

  async function getCharacterById(id: string): Promise<PlayerCharacter | null> {
    return await performAction(
      () => $csrfFetch<PlayerCharacter>(`/api/player/characters/${id}`),
      "character_details_loading_error",
    );
  }

  async function createCharacter(name: string): Promise<void> {
    await performAction(
      async () => {
        await $csrfFetch("/api/player/characters", {
          method: "POST",
          body: { name },
        });
        charactersReq.refresh();
        return null;
      },
      "character_creation_error",
    );
  }

  async function deleteCharacter(id: string): Promise<void> {
    await performAction(
      async () => {
        await $csrfFetch(`/api/player/characters/${id}`, {
          method: "DELETE",
        });
        charactersReq.refresh();
        return null;
      },
      "character_deletion_error",
    );
  }

  return { characters: charactersReq.data, isLoading, createCharacter, deleteCharacter, getCharacterById };
}
