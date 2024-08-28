/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { Card, CardContent, CardHeader, Skeleton } from "@/components";
import { useAuth } from "@/components/AuthProvider";
import { Combobox, Input } from "@/components/Form";

import { getGreeting, notEmpty, useForm, useInView, useSearch } from "@/global";

import { useUsers } from "@/modules/Home";
import { roleEnum } from "@/modules/Users";
import { CalendarClock, Search } from "lucide-react";
import { useWatch } from "react-hook-form";
import { z } from "zod";

const Home = () => {
  const { control } = useForm({
    schema: z.object({
      search: z.string().nullish(),
      role: roleEnum.nullish(),
    }),
  });
  const [search, role] = useWatch({
    control,
    name: ["search", "role"],
  });

  const watchSearch = useSearch(search ?? "");
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useUsers({
      search: watchSearch,
      role,
    });

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

      <CardContent className="px-0 grid grid-cols-1  gap-2 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          <h3>List of users.</h3>
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <Input
              inputType="controlled"
              control={control}
              name="search"
              placeholder="Search..."
              className="min-w-72 max-w-72"
              leadingContent={() => {
                return <Search className="text-muted-foreground " />;
              }}
            />
            <Combobox
              control={control}
              name="role"
              options={["User", "Admin", "Guest"]}
              placeholder="Role"
              className="min-w-72 max-w-72"
            />
          </div>
        </div>

        {!isPending && !isFetchingNextPage && totalDocs === 0 ? (
          <div className="flex h-[400px] items-center justify-center rounded-md flex-1 border">
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
