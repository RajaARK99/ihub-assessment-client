import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  PathValue,
} from "react-hook-form";

import {
  ClassNameAndText,
  LeadingTrailingContent,
  ReactHookFormOnChangeEvent,
} from "@/components/Form";

type ComboboxProps<
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
> = {
  control: Control<TFieldValue>;
  name: Name;
  clearable?: boolean;
  description?: string | ClassNameAndText;
  label?: string | ClassNameAndText;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  defaultValue?: PathValue<TFieldValue, Name>;
  leadingContent?: LeadingTrailingContent<TFieldValue, Name>;
  trailingContent?: LeadingTrailingContent<TFieldValue, Name>;
  onChange?: ReactHookFormOnChangeEvent<TFieldValue, Name>;
  multiple?: boolean;
  shouldUnregister?: boolean;
  allowCustomValue?: boolean;
  onLoadMore?: () => void;
  onInputChange?: (value: string | null) => void;
  options: NonNullable<FieldPathValue<TFieldValue, Name>> extends any[]
    ? NonNullable<FieldPathValue<TFieldValue, Name>>
    : NonNullable<FieldPathValue<TFieldValue, Name>>[];
  hasNextPage?: boolean;
  loading?: boolean;
  loadingMore?: boolean;
};

export type { ComboboxProps };
