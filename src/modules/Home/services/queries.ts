import { useInfiniteQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/global";

import { PaginatedResponse } from "@/types";
import { RoleEnum } from "@/modules/Users";

const useUsers = ({
  role,
  search,
}: {
  search?: string | null;
  role?: RoleEnum | null;
}) => {
  return useInfiniteQuery({
    queryKey: ["users", role, search],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<PaginatedResponse>(
        `/users?page=${pageParam}&limit=10`
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
  });
};

export { useUsers };
