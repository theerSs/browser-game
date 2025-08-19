import type { Alert } from "~/types";

export const useAlertStore = defineStore("useAlertStore", () => {
  const alert = ref<Alert | null>(null);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function setAlert(value: Alert) {
    alert.value = value;

    if (value.type === "error") {
      console.error("[Error]: ", value.message);
    }
    else if (value.type === "warning") {
      console.warn("[Warning]: ", value.message);
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      alert.value = null;
      timeoutId = null;
    }, 5_000);
  }

  return {
    alert,
    setAlert,
  };
});
