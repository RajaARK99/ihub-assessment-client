import { Dispatch, SetStateAction } from "react";

type Nullish<T> = T extends object
  ? {
      [K in keyof T]?: T[K] | null;
    }
  : T | null | undefined;

type SetState<T> = Dispatch<SetStateAction<T>>;

type PaginatedResponse<T> = {
  docs: T[] | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number | null;
  nextPage: number | null;
  page: number | null;
  pagingCounter: number | null;
  prevPage: number | null;
  totalDocs: number | null;
  totalPages: number | null;
};

export type { SetState, Nullish, PaginatedResponse };
