interface IntersectionObserverInitV2 extends IntersectionObserverInit {
  readonly trackVisibility?: boolean;
  readonly delay?: number;
}

interface IntersectionObserverEntryV2 extends IntersectionObserverEntry {
  readonly isVisible?: boolean;
}

interface ScrollDirection {
  vertical?: "up" | "down";
  horizontal?: "left" | "right";
}

interface Observe<T> {
  (element?: T | null): void;
}

interface Event<T> {
  readonly entry: IntersectionObserverEntryV2;
  readonly scrollDirection: ScrollDirection;
  observe: Observe<T>;
  unobserve: () => void;
}

interface Options<T> {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
  trackVisibility?: boolean;
  delay?: number;
  unobserveOnEnter?: boolean;
  onChange?: (event: Event<T> & { inView: boolean }) => void;
  onEnter?: (event: Event<T>) => void;
  onLeave?: (event: Event<T>) => void;
}

interface Return<T> extends Omit<Event<T>, "entry"> {
  inView: boolean;
  entry?: IntersectionObserverEntryV2;
  updatePosition: () => void;
}

interface State {
  inView: boolean;
  scrollDirection: ScrollDirection;
  entry?: IntersectionObserverEntryV2;
}

export type {
  State,
  Return,
  Options,
  Event,
  IntersectionObserverInitV2,
  Observe,
  IntersectionObserverEntryV2,
  ScrollDirection,
};
