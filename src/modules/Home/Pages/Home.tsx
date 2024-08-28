/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { CalendarClock } from "lucide-react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  JollyCalendar,
} from "@/components";
import { useAuth } from "@/components/AuthProvider";

import { getGreeting, notEmpty, useInView } from "@/global";

import { useMeetings } from "@/modules/Home";


const Home = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(now(getLocalTimeZone()));

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMeetings({
      startDate: date
        ?.set({
          hour: 0,
          minute: 0,
          millisecond: 0,
        })
        .toDate()
        .getTime(),
      endDate: date
        ?.set({
          hour: 23,
          minute: 59,
          millisecond: 0,
        })
        .toDate()
        .getTime(),
    });

  const { user } = useAuth();

  const totalDocs = data?.pages?.[0]?.totalDocs ?? 0;

  const meetings =
    data?.pages
      ?.map((docs) => docs.docs)
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
          {getGreeting()}, {user?.name ?? ""}
        </h2>
        {isPending || totalDocs === 0 ? null : (
          <Button
            size="sm"
            onPress={() => {
              navigate({
                to: "/home/new",
              });
            }}
            className={"max-w-40 mx-auto sm:m-0"}
          >
            Create meeting
          </Button>
        )}
      </CardHeader>

      <CardContent className="pt-2 px-0 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-2">
        <div className="space-y-5">
          {!isPending && !isFetchingNextPage && totalDocs === 0 ? (
            <div className="flex h-[400px] items-center justify-center rounded-md flex-1">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <CalendarClock className="size-6" />
                <h3 className="mt-4 text-lg font-semibold">
                  No meetings available.
                </h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  You have not added any meetings. Add one below.
                </p>
                <Button
                  size="sm"
                  onPress={() => {
                    navigate({
                      to: "/home/new",
                    });
                  }}
                >
                  Create meeting
                </Button>
              </div>
            </div>
          ) : null}
          {totalDocs > 0
            ? meetings?.map((meeting, i) => {
                return meeting?._id ? (
                  <MeetingCard
                    index={i}
                    meeting={meeting}
                    meetings={meetings}
                    navigate={navigate}
                    observe={observe}
                    key={i}
                  />
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
