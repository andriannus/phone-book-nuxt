export function debounce<T extends Function>(
  callback: T,
  wait: number,
): (...args: any[]) => void {
  let timeout: number;

  return function (this: any, ...args: any[]): void {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => callback.apply(this, args), wait);
  };
}
