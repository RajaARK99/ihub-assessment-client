import * as React from "react";
import { Tab, TabGroup, TabList, TabPanel } from "@headlessui/react";

import { cn } from "@/global";

const Tabs = TabGroup;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabList>,
  React.ComponentPropsWithoutRef<typeof TabList>
>(({ className, ...props }, ref) => (
  <TabList
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Tab>,
  React.ComponentPropsWithoutRef<typeof Tab>
>(({ className, ...props }, ref) => (
  <Tab
    ref={ref}
    className={cn(
      "focus:outline-none inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm",
      className
    )}
    {...props}
  />
));

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabPanel>,
  React.ComponentPropsWithoutRef<typeof TabPanel>
>(({ className, ...props }, ref) => (
  <TabPanel
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));

export { Tabs, TabsList, TabsTrigger, TabsContent };
