import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

if (!('fetch' in globalThis) || typeof globalThis.fetch !== 'function') {
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    writable: true,
    value: vi.fn(() => Promise.resolve(new Response(null, { status: 404 }))),
  });
}
