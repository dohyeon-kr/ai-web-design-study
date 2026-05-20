export function notify(message: string) {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { message } }));
}
