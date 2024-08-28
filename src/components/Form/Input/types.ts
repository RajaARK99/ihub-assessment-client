import { ReactNode } from "react";
import { Control, FieldPath, FieldValues, PathValue } from "react-hook-form";
import { TextFieldProps } from "react-aria-components";

import {
  ClassNameAndText,
  LeadingTrailingContent,
  ReactHookFormOnChangeEvent,
} from "@/components/Form";

type CommonInputProps = {
  clearable?: boolean;
  description?: string | ClassNameAndText;
  label?: string | ClassNameAndText;
  disabled?: boolean;
  readOnly?: boolean;
  type?: TextFieldProps["type"];
  placeholder?: string;
  className?: string;
  maxLength?: number;
  minLength?: number;
};

type InputProps<
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
> =
  | ({
      inputType: "normal";
      name: string;
      value?: string;
      onChange?: (value: string | null) => void;
      defaultValue?: string;
      leadingContent?: ReactNode;
      trailingContent?: ReactNode;
      control?: undefined;
      shouldUnregister?: undefined;
    } & CommonInputProps)
  | ({
      inputType: "controlled";
      control: Control<TFieldValue>;
      name: Name;
      onChange?: ReactHookFormOnChangeEvent<TFieldValue, Name>;
      shouldUnregister?: boolean;
      defaultValue?: PathValue<TFieldValue, Name>;
      leadingContent?: LeadingTrailingContent<TFieldValue, Name>;
      trailingContent?: LeadingTrailingContent<TFieldValue, Name>;
      value?: undefined;
    } & CommonInputProps);

export type { InputProps };
