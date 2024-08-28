import useForm from "@/global/hooks/useForm/useForm";
import useLatest from "@/global/hooks/useLatest/useLatest";
import type { Observe } from "@/global/hooks/useInView";
import { useInView } from "@/global/hooks/useInView";
import { useSearch } from "@/global/hooks/useSearch";
import { useUnmount } from "@/global/hooks/useUnmount";
import { useDebounceCallback } from "@/global/hooks/useDebounceCallback";
import { useIsomorphicLayoutEffect } from "@/global/hooks/useIsomorphicLayoutEffect";
import { useEventListener } from "@/global/hooks/useEventListener";
import { useWindowSize } from "@/global/hooks/useWindowSize";

export {
  useForm,
  useLatest,
  useInView,
  useSearch,
  useUnmount,
  useDebounceCallback,
  useIsomorphicLayoutEffect,
  useEventListener,
  useWindowSize,
};
export type { Observe };
