import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
