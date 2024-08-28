import { FC } from "react";
import { useSeparator, SeparatorProps } from "react-aria";

import { cn } from "@/global";

const Separator: FC<SeparatorProps & { className?: string }> = ({
  className,
  orientation = "horizontal",
  elementType,
}) => {
  const { separatorProps } = useSeparator({ orientation, elementType });

  return (
    <div
      {...separatorProps}
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full border-l"
          : "h-full w-px border-t",
        className
      )}
    />
  );
};

export { Separator };
