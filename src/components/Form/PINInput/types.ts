import { Control, FieldPath, FieldValues, PathValue } from "react-hook-form";
import { VariantProps } from "tailwind-variants";

import { ReactHookFormOnChangeEvent } from "@/components/Form";
import { pinInputStyles } from "@/components/Form/PINInput";

type PINInputSizeVariant = VariantProps<typeof pinInputStyles>["size"];

interface PINInputProps<
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
> {
  control: Control<TFieldValue>;
  name: Name;
  disabled?: boolean;
  onChange?: ReactHookFormOnChangeEvent<TFieldValue, Name>;
  readOnly?: boolean;
  shouldUnregister?: boolean;
  defaultValue?: PathValue<TFieldValue, Name>;
  size?: PINInputSizeVariant;
  inputClassName?: string;
  className?: string;
  placeholder?: string;
  length?: number;
}

export type { PINInputProps, PINInputSizeVariant };
