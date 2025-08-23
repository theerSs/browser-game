export function useApiRequest() {
  const isPending = ref(false);
  const { setAlert } = useAlertStore();

  async function performAction<T>(action: () => Promise<T>, errorMessage: string) {
    isPending.value = true;
    try {
      return await action();
    }
    catch (e) {
      console.error(e);
      setAlert({ type: "error", message: errorMessage });
      return null;
    }
    finally {
      isPending.value = false;
    }
  }

  return { performAction, isPending };
}
