import { createEffect } from 'effector';

export const focusInput = createEffect((element: HTMLElement) => {
  return element.focus();
});
