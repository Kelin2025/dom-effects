import { guard, sample, Store, Event as EffectorEvent } from 'effector';
import { preventDefault } from '../effects/prevent';

const targetFilters: Record<
  string,
  <
    Element extends HTMLElement,
    EventType extends Event | { target: EventTarget }
  >(
    current: Element | null,
    evt: EventType
  ) => boolean
> = {
  normal: (current, evt) => current === evt.target,
  deep: (current, evt) => {
    return Boolean(current) && current!.contains(evt.target as Element);
  },
};

/**
 * Triggers `clock` only if it's fired on specific `current`.
 * If `deep` is true, checks parents tree as well.
 * You can also pass `prevent` option to automatically `event.preventDefault()`
 */
export const onTarget = <
  EventType extends Event | { target: EventTarget },
  Element extends
    | HTMLElement
    | null
    | HTMLElement[]
    | Record<string, HTMLElement | null>
>(opts: {
  clock: EffectorEvent<EventType>;
  current: Store<Element>;
  prevent?: boolean;
  deep?: boolean;
}) => {
  const handler = sample({
    source: opts.clock,
    clock: guard({
      source: opts.current,
      clock: opts.clock,
      filter: (current, evt) => {
        const filter = targetFilters[opts.deep ? 'deep' : 'normal'];
        // For null
        if (!current) {
          return false;
        }
        // For single Element
        if (current instanceof Element) {
          return filter(current, evt);
        }
        // For Element[]
        if (Array.isArray(current)) {
          return current.some(el => filter(el, evt));
        }
        // For Record<string, Element>
        return Object.values(current).some(el => filter(el, evt));
      },
    }),
  });
  if (opts.prevent) {
    sample(handler, preventDefault);
  }
  return handler;
};

/**
 * Triggers `clock` only if it's fired OUTSIDE of specific `current`.
 * If `deep` is true, checks parents tree as well.
 * You can also pass `prevent` option to automatically `event.preventDefault()`
 */
export const offTarget = <
  EventType extends Event | { target: EventTarget },
  Element extends
    | HTMLElement
    | null
    | HTMLElement[]
    | Record<string, HTMLElement | null>
>(opts: {
  clock: EffectorEvent<EventType>;
  current: Store<Element>;
  prevent?: boolean;
  deep?: boolean;
}) => {
  const handler = sample({
    source: opts.clock,
    clock: guard({
      source: opts.current,
      clock: opts.clock,
      filter: (current, evt) => {
        const filter = targetFilters[opts.deep ? 'deep' : 'normal'];
        // For null
        if (!current) {
          return true;
        }
        // For single Element
        if (current instanceof Element) {
          return !filter(current, evt);
        }
        // For Element[]
        if (Array.isArray(current)) {
          return current.every(el => !filter(el, evt));
        }
        // For Record<string, Element>
        return Object.values(current).every(el => !filter(el, evt));
      },
    }),
  });
  if (opts.prevent) {
    sample(handler, preventDefault);
  }
  return handler;
};
