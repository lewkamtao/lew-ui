// 全局共享的 demo 加载状态
const demoAllLoaded = ref(false);

export function useDemoLoaded() {
  function setLoaded(value: boolean) {
    demoAllLoaded.value = value;
  }

  return {
    demoAllLoaded: readonly(demoAllLoaded),
    setLoaded,
  };
}
