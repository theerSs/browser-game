export function useStatsList(stats: Ref<CharacterStats>) {
  const statsList = computed(() => Object.entries(stats.value).map(([key, value]) => ({
    name: key,
    value: Array.isArray(value) ? getValueRange(value) : value,
  })));

  function getValueRange(rangeArr: [number, number]): string {
    if (rangeArr.length < 2) {
      return "-";
    }

    const [min, max] = rangeArr;
    return `${min} - ${max}`;
  }

  return { statsList };
}
