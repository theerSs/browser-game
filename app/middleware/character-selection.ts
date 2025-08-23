export default defineNuxtRouteMiddleware(() => {
  const { character } = useCharacterStore();
  if (!character) {
    return navigateTo("/characters-list");
  }
});
