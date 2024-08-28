
import { tv, type VariantProps } from "tailwind-variants";
import {
  Field,
  FieldErrorTextProps,
  FieldHelperTextProps,
} from "@ark-ui/react";
import {
  FieldError as AriaFieldError,
  FieldErrorProps as AriaFieldErrorProps,
  Group as AriaGroup,
  GroupProps as AriaGroupProps,
  Label as AriaLabel,
  LabelProps as AriaLabelProps,
  Text as AriaText,
  TextProps as AriaTextProps,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "@/global";

const labelVariants = tv({
  base: [
    "text-sm font-medium leading-none",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
    "group-data-[invalid]:text-destructive data-[invalid]:text-destructive",
  ],
  variants: {
    invalid: { true: "text-destructive" },
  },
});

const Label = ({ className, ...props }: AriaLabelProps) => (
  <AriaLabel className={cn(labelVariants(), className)} {...props} />
);

function FormDescription({ className, ...props }: AriaTextProps) {
  return (
    <AriaText
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
      slot="description"
    />
  );
}

function FieldError({ className, ...props }: AriaFieldErrorProps) {
  return (
    <AriaFieldError
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    />
  );
}

const FieldErrorARKUI = ({ className, ...props }: FieldErrorTextProps) => {
  return (
    <Field.ErrorText
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    />
  );
};

const FieldDescription = ({ className, ...props }: FieldHelperTextProps) => {
  return (
    <Field.HelperText
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};
const fieldGroupVariants = tv({
  variants: {
    variant: {
      default: [
        "relative flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        /* Focus Within */
        "data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-2",
        /* Disabled */
        "data-[disabled]:opacity-50",
        "group-data-[invalid]:border-destructive group-data-[invalid]:data-[focus-within]:ring-destructive",
      ],
      ghost: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface GroupProps
  extends AriaGroupProps,
    VariantProps<typeof fieldGroupVariants> {}

function FieldGroup({ className, variant, ...props }: GroupProps) {
  return (
    <AriaGroup
      className={composeRenderProps(className, (className) =>
        cn(fieldGroupVariants({ variant }), className)
      )}
      {...props}
    />
  );
}

export {
  Label,
  FieldGroup,
  FieldError,
  FormDescription,
  fieldGroupVariants,
  labelVariants,
  FieldErrorARKUI,
  FieldDescription,
};
