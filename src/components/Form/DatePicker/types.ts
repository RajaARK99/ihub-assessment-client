import { ReactNode } from "react";
import { Control, FieldPath, FieldValues, PathValue } from "react-hook-form";

import {
  ClassNameAndText,
  LeadingTrailingContent,
  ReactHookFormOnChangeEvent,
} from "@/components/Form";
import {
  DateValue,
  DatePickerProps as AreaDatePickerProps,
} from "react-aria-components";

type CommonDatePickerProps = {
  clearable?: boolean;
  description?: string | ClassNameAndText;
  label?: string | ClassNameAndText;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: DateValue;
  className?: string;
  max?: DateValue;
  min?: DateValue;
  granularity?: AreaDatePickerProps<DateValue>["granularity"];
};

type DatePickerProps<
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
> =
  | ({
      type: "normal";
      name: string;
      value?: DateValue;
      onChange?: (value: DateValue | null) => void;
      defaultValue?: DateValue;
      leadingContent?: ReactNode;
      trailingContent?: ReactNode;
      control?: undefined;
      shouldUnregister?: undefined;
    } & CommonDatePickerProps)
  | ({
      type: "controlled";
      control: Control<TFieldValue>;
      name: Name;
      onChange?: ReactHookFormOnChangeEvent<TFieldValue, Name>;
      shouldUnregister?: boolean;
      defaultValue?: PathValue<TFieldValue, Name>;
      leadingContent?: LeadingTrailingContent<TFieldValue, Name>;
      trailingContent?: LeadingTrailingContent<TFieldValue, Name>;
      value?: undefined;
    } & CommonDatePickerProps);

export type { DatePickerProps };
