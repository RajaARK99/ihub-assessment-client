/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { Card, CardContent, CardHeader, Skeleton } from "@/components";
import { useAuth } from "@/components/AuthProvider";

import { getGreeting, notEmpty, useInView } from "@/global";

import { useUsers } from "@/modules/Home";

const Home = () => {
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

      <CardContent className="pt-2 px-0 grid grid-cols-1  gap-2">
        {totalDocs > 0
          ? users?.map((user, index) => {
              return user?.id ? (
                <Card
                  key={user?.id}
                  ref={users?.length - 1 === index ? observe : undefined}
                >
                  <CardHeader className="flex-col p-3 gap-0.5">
                    <p className="truncate text-sm">
                      {user?.firstName} - {user?.lastName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 space-y-3 flex justify-between items-center">
                    <p className="truncate text-xs">{user?.mobileNumber}</p>
                    <p className="truncate text-xs">{user?.role}</p>
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
      </CardContent>
    </Card>
  );
};

export default Home;
