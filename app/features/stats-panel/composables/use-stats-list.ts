export function useStatsList(stats: CharacterStats) {
  const statsList = computed(() => Object.entries(stats).map(([key, value]) => ({
    name: key,
    value: Array.isArray(value) ? `${value[0]} - ${value[1]}` : value,
  })));

  return { statsList };
}
