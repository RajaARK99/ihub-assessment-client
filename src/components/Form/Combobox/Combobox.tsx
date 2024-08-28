import { Fragment, useEffect, useState } from "react";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import {
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  ComboboxButton,
  Field,
  Combobox as HeadlessCombobox,
  Button,
  Label,
} from "@headlessui/react";
import { Check, ChevronsUpDown, Loader2, XIcon } from "lucide-react";

import { labelVariants } from "@/components/Field";
import { buttonVariants } from "@/components/Button";
import { ComboboxProps } from "@/components/Form/Combobox";

import { cn, useInView } from "@/global";

type OptionType =
  | string
  | { id: number | string; label: string; disabled: boolean };

const Combobox = <
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
>({
  control,
  name,
  options,
  shouldUnregister,
  defaultValue,
  className,
  clearable = true,
  description,
  disabled,
  label,
  leadingContent,
  multiple,
  onChange,
  placeholder,
  trailingContent,
  onLoadMore,
  allowCustomValue,
  hasNextPage,
  loading,
  loadingMore,
  onInputChange,
}: ComboboxProps<TFieldValue, Name>) => {
  const [inputValue, setInputValue] = useState("");
  const { observe } = useInView({
    onEnter: () => {
      if (hasNextPage) {
        onLoadMore?.();
      }
    },
  });

  useEffect(() => {
    if (onInputChange) {
      onInputChange(inputValue);
    }
  }, [inputValue, onInputChange]);

  return (
    <Controller
      name={name}
      control={control}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      rules={{
        onChange: (e) => {
          onChange?.(e?.target?.value ?? null);
        },
      }}
      render={({
        field: { name, onChange, value },
        fieldState: { error, invalid },
      }) => {
        const hasValue = multiple ? value?.length > 0 : !!value;
        return (
          <Field
            className={cn("group flex flex-col gap-2", className)}
            disabled={disabled}
          >
            <HeadlessCombobox
              value={value}
              onChange={onChange}
              onClose={() => {
                setInputValue("");
              }}
              multiple={multiple}
              name={name}
              disabled={disabled}
            >
              {label && (
                <Label
                  htmlFor={name}
                  className={labelVariants({
                    invalid,
                    className:
                      typeof label === "object" ? label?.className : "",
                  })}
                >
                  {typeof label === "string" ? label : label?.text}
                </Label>
              )}
              <div
                className={cn(
                  "relative flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  "data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-2",
                  "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                  "data-[disabled]:opacity-50",
                  invalid
                    ? "border-destructive focus-within:ring-destructive"
                    : ""
                )}
                data-invalid={invalid}
              >
                {leadingContent && typeof leadingContent === "function"
                  ? leadingContent(value)
                  : leadingContent}
                <ComboboxInput
                  displayValue={(value) => (value as string) ?? ""}
                  onChange={(event) => {
                    setInputValue(event?.target?.value);
                  }}
                  className={cn(
                    "flex h-10 w-full bg-background px-3 py-2 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
                    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
                    invalid ? "placeholder:text-destructive/60" : ""
                  )}
                  placeholder={placeholder}
                  autoComplete="off"
                />
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {hasValue && clearable && (
                  <Button
                    className={buttonVariants({
                      size: "icon",
                      variant: "ghost",
                      className:
                        "size-6 p-1 hover:bg-accent hover:text-accent-foreground",
                    })}
                    onClick={() => {
                      onChange(multiple ? [] : null);
                    }}
                  >
                    <XIcon aria-hidden className="size-4" />
                  </Button>
                )}
                <ComboboxButton
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                    className:
                      "size-6 p-1 hover:bg-accent hover:text-accent-foreground",
                  })}
                >
                  <ChevronsUpDown aria-hidden className="size-4" />
                </ComboboxButton>
                {trailingContent && typeof trailingContent === "function"
                  ? trailingContent(value)
                  : trailingContent}
              </div>
              <ComboboxOptions
                anchor={{ gap: 5, offset: -12, to: "bottom start" }}
                transition
                className={cn(
                  "border bg-background w-[calc(var(--input-width)+48px+24px)] rounded-[--radius] [--anchor-max-height:200px] p-2"
                )}
                portal
              >
                {allowCustomValue && inputValue?.trim().length > 0 && (
                  <ComboboxOption
                    value={inputValue?.trim()}
                    className={cn(
                      "relative pl-8 flex w-full max-w-full cursor-pointer select-none items-center rounded-sm pr-2 py-1.5 text-sm outline-none",
                      /* Disabled */
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                      /* Focused */
                      "data-[focus]:bg-accent data-[focus]:text-accent-foreground",
                      /* Hovered */
                      "data-[active]:bg-accent data-[active]:text-accent-foreground"
                    )}
                  >
                    {({ selected }) => {
                      return (
                        <Fragment>
                          {inputValue?.trim()}
                          {selected ? (
                            <div className="absolute left-2 flex size-4 items-center justify-center">
                              <Check className="size-4" />
                            </div>
                          ) : null}
                        </Fragment>
                      );
                    }}
                  </ComboboxOption>
                )}
                {options?.length === 0 ? (
                  <p className="text-sm pl-8 py-1.5">No items available.</p>
                ) : null}
                {options.map((option: OptionType, i: number) => (
                  <ComboboxOption
                    key={typeof option === "string" ? option : option?.label}
                    value={option}
                    className={cn(
                      "relative pl-8 flex w-full cursor-pointer select-none items-center rounded-sm pr-2 py-1.5 text-sm outline-none truncate",
                      /* Disabled */
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                      /* Focused */
                      "data-[focus]:bg-accent data-[focus]:text-accent-foreground",
                      /* Hovered */
                      "data-[active]:bg-accent data-[active]:text-accent-foreground"
                    )}
                    ref={options?.length - 1 === i ? observe : undefined}
                  >
                    {({ selected }) => {
                      return (
                        <Fragment>
                          {typeof option === "string" ? option : option?.label}
                          {selected ? (
                            <div className="absolute left-2 flex size-4 items-center justify-center">
                              <Check className="size-4" />
                            </div>
                          ) : null}
                        </Fragment>
                      );
                    }}
                  </ComboboxOption>
                ))}
                {loadingMore && (
                  <div className="w-full justify-center items-center py-2">
                    <Loader2 className="size-5 animate-spin mx-auto" />
                  </div>
                )}
              </ComboboxOptions>
              {!invalid && description && (
                <Description className={cn("text-sm text-muted-foreground")}>
                  {typeof description === "string"
                    ? description
                    : description?.text}
                </Description>
              )}
              {error?.message && (
                <Description
                  className={cn("text-sm font-medium text-destructive")}
                >
                  {error?.message}
                </Description>
              )}
            </HeadlessCombobox>
          </Field>
        );
      }}
    />
  );
};

export { Combobox };
