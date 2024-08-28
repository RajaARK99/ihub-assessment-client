import { ReactNode } from "@tanstack/react-router";
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  PathValue,
} from "react-hook-form";

type ReactHookFormOnChangeEvent<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = (value: FieldPathValue<TFieldValues, Name>) => void;

type ObjectOption = {
  id: string | number;
  name: string;
  disabled?: boolean;
} & Record<string, any>;

type OptionType = string | number | ObjectOption;

type LeadingTrailingContent<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ((value: PathValue<TFieldValues, Name>) => ReactNode) | ReactNode;

interface ClassNameAndText {
  className?: string;
  text?: string;
}

export type {
  ReactHookFormOnChangeEvent,
  ObjectOption,
  OptionType,
  ClassNameAndText,
  LeadingTrailingContent,
};
