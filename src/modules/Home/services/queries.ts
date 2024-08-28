import { useInfiniteQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/global";

import { Meeting } from "@/modules/Home";

import { PaginatedResponse } from "@/types";

const useMeetings = ({
  startDate,
  endDate,
  allMeeting,
}: {
  startDate: number;
  endDate: number;
  allMeeting?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: allMeeting ? ["all-meetings"] : ["meetings", startDate, endDate],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<PaginatedResponse<Meeting>>(
        allMeeting
          ? `/meetings/paginate?page=${pageParam}&perPage=10`
          : `/meetings/paginate?page=${pageParam}&perPage=10&startDate=${startDate}&endDate=${endDate}`
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
  });
};

const useCustomers = ({ search }: { search: string | null }) => {
  return useInfiniteQuery({
    queryKey: ["customers", search],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<
        PaginatedResponse<{ name: string; email: string }>
      >(
        `/customers/paginate?page=${pageParam}&perPage=10&searchText=${search}`
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
  });
};

export { useMeetings, useCustomers };
