import { PinInput } from "@ark-ui/react";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

import { PINInputProps } from "@/components/Form/PINInput";

const PINInput = <
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
>({
  control,
  name,
  defaultValue,
  onChange,
  readOnly,
  className,
  disabled,
  inputClassName,
  placeholder,
  shouldUnregister,
  size,
  length = 6,
}: PINInputProps<TFieldValue, Name>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        onChange: (e) => {
          onChange?.(e?.target?.value);
        },
      }}
      shouldUnregister={shouldUnregister}
      render={({ field: { name, onChange, ref }, fieldState: { invalid } }) => {
        const { input, parent } = pinInputStyles({
          size,
          disabled,
          invalid,
          readonly: readOnly,
        });
        return (
          <PinInput.Root
            asChild
            onValueChange={(e) => {
              onChange(e.valueAsString);
            }}
            onValueComplete={(e) => {
              onChange(e.valueAsString);
            }}
            otp
            name={name}
            ref={ref}
          >
            <PinInput.Control className={parent({ className })}>
              {Array.from({ length }, (_, index) => index)?.map((id, index) => (
                <PinInput.Input
                  className={input({ className: inputClassName })}
                  key={id}
                  index={index}
                  placeholder={placeholder ?? "*"}
                />
              ))}
            </PinInput.Control>
          </PinInput.Root>
        );
      }}
    />
  );
};

const pinInputStyles = tv({
  slots: {
    parent: "flex gap-2 flex-wrap justify-center items-center",
    input:
      "focus:outline-none text-center max-w-14 transition-colors duration-300 rounded cursor-text border border-input bg-background focus:border-primary flex justify-center items-center",
  },
  defaultVariants: { size: "xl" },
  variants: {
    size: {
      sm: {
        input: "p-2",
      },
      md: {
        input: "p-2.5",
      },
      lg: {
        input: "p-3.5",
      },
      xl: {
        input: "p-4",
      },
    },
    disabled: {
      true: {
        input: "cursor-not-allowed",
      },
    },
    readonly: {
      true: {
        input: "cursor-default",
      },
    },
    invalid: {
      true: {
        input:
          "focus:border-destructive placeholder-destructive focus:placeholder-destructive caret-destructive border-destructive",
      },
    },
  },
});
export { PINInput, pinInputStyles };
