import { CalendarIcon } from "lucide-react";
import { composeRenderProps, I18nProvider, Text } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  DateInput,
  DatePickerClearButton,
  DatePickerContent,
  FieldError,
  FieldGroup,
  Label,
  DatePicker as AriaDatePicker,
  TimeField,
} from "@/components";
import { DatePickerProps } from "@/components/Form/DatePicker";

import { cn } from "@/global";
import { Fragment } from "react/jsx-runtime";

const Component = ({
  name,
  className,
  clearable,
  defaultValue,
  description,
  disabled,
  error,
  invalid,
  label,
  leadingContent,
  max,
  min,
  onChange,
  placeholder,
  readOnly,
  trailingContent,
  value,
  type,
  granularity,
}: Omit<DatePickerProps, "control" | "shouldUnregister"> & {
  error?: { message?: string } | undefined;
  invalid?: boolean;
}) => {
  return (
    <I18nProvider locale="en-IN">
      <AriaDatePicker
        className={composeRenderProps(className, (className) =>
          cn("group flex flex-col gap-2", className)
        )}
        value={value}
        onChange={onChange}
        hideTimeZone
        hourCycle={12}
        minValue={min}
        maxValue={max}
        placeholderValue={placeholder}
        isReadOnly={readOnly}
        isDisabled={disabled}
        isInvalid={invalid}
        defaultValue={defaultValue}
        shouldForceLeadingZeros
        granularity={granularity ?? "day"}
        shouldCloseOnSelect={false}
      >
        {({ state }) => {
          return (
            <Fragment>
              {label && (
                <Label
                  htmlFor={name}
                  className={typeof label === "object" ? label?.className : ""}
                >
                  {typeof label === "string" ? label : label?.text}
                </Label>
              )}
              <FieldGroup>
                {leadingContent && typeof leadingContent === "function"
                  ? leadingContent(value)
                  : leadingContent}

                <DateInput className="flex-1" variant="ghost" />

                {value && clearable && type === "controlled" && (
                  <DatePickerClearButton />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-1 size-6 data-[focus-visible]:ring-offset-0"
                >
                  <CalendarIcon aria-hidden className="size-4" />
                </Button>
                {trailingContent && typeof trailingContent === "function"
                  ? trailingContent(value)
                  : trailingContent}
              </FieldGroup>
              {!error?.message && description && (
                <Text
                  slot="description"
                  className={cn(
                    "text-sm text-muted-foreground",
                    typeof description === "object"
                      ? description?.className
                      : ""
                  )}
                >
                  {typeof description === "string"
                    ? description
                    : description?.text}
                </Text>
              )}
              {error?.message && <FieldError>{error?.message}</FieldError>}
              <DatePickerContent className="grid grid-cols-1 space-x-0 sm:space-x-0 gap-3 space-y-0">
                <Calendar className={"w-fit"}>
                  <CalendarHeading />
                  <CalendarGrid>
                    <CalendarGridHeader>
                      {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                    </CalendarGridHeader>
                    <CalendarGridBody>
                      {(date) => <CalendarCell date={date} />}
                    </CalendarGridBody>
                  </CalendarGrid>
                </Calendar>
                <TimeField
                  className={composeRenderProps(className, (className) =>
                    cn("group flex flex-col gap-2", className)
                  )}
                  value={state?.timeValue}
                  onChange={(e) => state?.setTimeValue(e)}
                  granularity={
                    state?.granularity !== "day" ? state?.granularity : "minute"
                  }
                  hideTimeZone
                  shouldForceLeadingZeros
                  hourCycle={12}
                  isDisabled={state?.dateValue?.day ? false : true}
                  name={`calendarTime`}
                >
                  <DateInput />
                </TimeField>

                <Button
                  onPress={() => {
                    state.close();
                  }}
                  variant="outline"
                >
                  Close
                </Button>
              </DatePickerContent>
            </Fragment>
          );
        }}
      </AriaDatePicker>
    </I18nProvider>
  );
};

const DatePicker = <
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
>({
  type,
  name,
  className,
  clearable = true,
  control,
  defaultValue,
  description,
  disabled,
  label,
  leadingContent,
  max,
  min,
  onChange,
  placeholder,
  readOnly,
  shouldUnregister,
  trailingContent,
  value,
  granularity,
}: DatePickerProps<TFieldValue, Name>) => {
  return type === "normal" ? (
    <Component
      name={name}
      className={className}
      clearable={clearable}
      defaultValue={defaultValue}
      description={description}
      disabled={disabled}
      error={undefined}
      label={label}
      leadingContent={leadingContent}
      max={max}
      min={min}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      trailingContent={trailingContent}
      value={value}
      type={type}
      granularity={granularity}
    />
  ) : (
    <Controller
      name={name}
      control={control}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      rules={{
        onChange: (e) => {
          onChange?.(e?.target?.value);
        },
      }}
      render={({
        field: { name, onChange, value },
        fieldState: { invalid, error },
      }) => {
        return (
          <Component
            name={name}
            className={className}
            clearable={clearable}
            defaultValue={defaultValue}
            description={description}
            disabled={disabled}
            error={error}
            label={label}
            leadingContent={leadingContent}
            max={max}
            min={min}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            trailingContent={trailingContent}
            value={value}
            invalid={invalid}
            type={type}
            granularity={granularity}
          />
        );
      }}
    />
  );
};

export { DatePicker };
