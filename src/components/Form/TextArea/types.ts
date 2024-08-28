import { Control, FieldPath, FieldValues, PathValue } from "react-hook-form";

import {
  ClassNameAndText,
  ReactHookFormOnChangeEvent,
} from "@/components/Form";

type CommonTextAreaProps = {
  description?: string | ClassNameAndText;
  label?: string | ClassNameAndText;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  minLength?: number;
  textAreaClassName?: string;
};

type TextAreaProps<
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
> =
  | ({
      type: "normal";
      name: string;
      value?: string;
      onChange?: (value: string | null) => void;
      defaultValue?: string;
      control?: undefined;
      shouldUnregister?: undefined;
    } & CommonTextAreaProps)
  | ({
      type: "controlled";
      control: Control<TFieldValue>;
      name: Name;
      onChange?: ReactHookFormOnChangeEvent<TFieldValue, Name>;
      shouldUnregister?: boolean;
      defaultValue?: PathValue<TFieldValue, Name>;
      value?: undefined;
    } & CommonTextAreaProps);

export type { TextAreaProps };
