export function delayAction(cb: () => void, ms: number) {
  const timer = setTimeout(cb, ms);
  return () => clearTimeout(timer);
}