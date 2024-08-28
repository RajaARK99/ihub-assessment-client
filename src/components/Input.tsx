import {
  Input as AriaInput,
  InputProps as AriaInputProps,
  TextArea as AriaTextArea,
  TextAreaProps as AriaTextAreaProps,
  Group as AriaGroup,
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  GroupProps as AriaGroupProps,
  composeRenderProps,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";

import { Button } from "@/components";

import { cn } from "@/global";

function TextField({ className, ...props }: AriaTextFieldProps) {
  return (
    <AriaTextField
      className={composeRenderProps(className, (className) =>
        cn("group", className)
      )}
      {...props}
    />
  );
}

function TextFieldInput({ className, ...props }: AriaInputProps) {
  return (
    <AriaInput
      className={composeRenderProps(className, (className) =>
        cn(
          "min-w-0 flex-1 bg-background px-2 py-1.5 outline outline-0 placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden data-[invalid]:placeholder-destructive/60",
          className
        )
      )}
      {...props}
    />
  );
}

function TextFieldGroup({ className, ...props }: AriaGroupProps) {
  return (
    <AriaGroup
      className={composeRenderProps(className, (className) =>
        cn(
          "flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          /* Focus Within */
          "data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-2",
          /* Disabled */
          "data-[disabled]:opacity-50",
          // Invalid
          "group-data-[invalid]:border-destructive group-data-[invalid]:data-[focus-within]:ring-destructive",
          className
        )
      )}
      {...props}
    />
  );
}

function TextFieldButton({ className, ...props }: AriaButtonProps) {
  return (
    <Button
      className={composeRenderProps(className, (className) =>
        cn("mr-1 size-6 data-[focus-visible]:ring-offset-0", className)
      )}
      variant="ghost"
      size="icon"
      {...props}
    />
  );
}

const Input = ({ className, ...props }: AriaInputProps) => {
  return (
    <AriaInput
      className={composeRenderProps(className, (className) =>
        cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
          /* Disabled */
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          /* Focused */
          "data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2",
          /* Resets */
          "focus-visible:outline-none",
          className
        )
      )}
      {...props}
    />
  );
};

const TextArea = ({ className, ...props }: AriaTextAreaProps) => {
  return (
    <AriaTextArea
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground resize-none",
          /* Focused */
          "data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2",
          /* Disabled */
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          /* Resets */
          "focus-visible:outline-none",
          // Invalid
          "data-[invalid]:border-destructive data-[invalid]:data-[focused]:ring-destructive data-[invalid]:placeholder-destructive/60",
          className
        )
      )}
      {...props}
    />
  );
};

export {
  Input,
  TextField,
  TextArea,
  TextFieldInput,
  TextFieldGroup,
  TextFieldButton,
};
