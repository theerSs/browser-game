export function useCombatFormatting(combatState: Ref<CombatState | null>) {
  const player = computed(() => combatState.value?.player);
  const enemy = computed(() => combatState.value?.enemy);

  const damageRange = computed(() => player.value ? `${player.value.stats.damage[0]} - ${player.value.stats.damage[1]}` : "");
  const defenceValue = computed(() => player.value ? `${player.value.stats.defence}%` : "");
  const dodgeChance = computed(() => player.value && enemy.value ? `${Math.max(0, player.value.stats.dex - enemy.value.stats.dex)}%` : "");

  return { damageRange, defenceValue, dodgeChance };
}
