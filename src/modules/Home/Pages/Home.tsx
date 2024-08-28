/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { CalendarClock } from "lucide-react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  JollyCalendar,
} from "@/components";
import { useAuth } from "@/components/AuthProvider";

import { getGreeting, notEmpty, useInView } from "@/global";

import { useUsers } from "@/modules/Home";

const Home = () => {
  const [date, setDate] = useState(now(getLocalTimeZone()));

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useUsers({});

  const { user } = useAuth();

  const totalDocs = data?.pages?.[0]?.totalDocs ?? 0;

  const users =
    data?.pages
      ?.map((docs) => docs.users)
      ?.filter(notEmpty)
      ?.flat(2) ?? [];

  const { observe } = useInView<HTMLDivElement>({
    onEnter: () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <Card className="min-h-[calc(100vh-92px)] border-dashed m-3 p-2 divide-y truncate">
      <CardHeader className="px-0 sm:flex-row sm:items-center sm:justify-between pt-3">
        <h2 className="text-xl truncate">
          {getGreeting()}, {user?.firstName ?? ""}
        </h2>
      </CardHeader>

      <CardContent className="pt-2 px-0 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-2">
        <div className="space-y-5">
          {!isPending && !isFetchingNextPage && totalDocs === 0 ? (
            <div className="flex h-[400px] items-center justify-center rounded-md flex-1">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <CalendarClock className="size-6" />
                <h3 className="mt-4 text-lg font-semibold">
                  No users available.
                </h3>
              </div>
            </div>
          ) : null}
          {totalDocs > 0
            ? users?.map((user, index) => {
                return user?.id ? (
                  <Card ref={users?.length - 1 === index ? observe : undefined}>
                    <CardHeader className="flex-row justify-between items-center p-3 gap-2">
                      <p className="truncate text-sm">{user?.firstName}</p>
                      <p className="truncate text-sm">{user?.lastName}</p>
                    </CardHeader>
                    <CardContent className="px-3 pb-3 space-y-3">
                      <p className="truncate text-sm">{user?.email}</p>{" "}
                      <p className="truncate text-sm">{user?.mobileNumber}</p>{" "}
                      <p className="truncate text-sm">{user?.role}</p>
                    </CardContent>
                  </Card>
                ) : null;
              })
            : null}
          {isPending || isFetchingNextPage
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="min-w-full min-h-[147px]" />
              ))
            : null}
        </div>
        <div className="pl-2 flex justify-center row-start-1 lg:col-start-2">
          <JollyCalendar
            value={date}
            onChange={setDate}
            className={"lg:border p-1 rounded"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;
