import { z } from "zod";
import {
  FieldValues,
  UseFormProps,
  useForm as _useForm,
} from "react-hook-form";

import { zodResolver } from "@/global";

const useForm = <
  T extends z.Schema<any, any>,
  TContext = any,
  TTransformedValues extends FieldValues = z.infer<T>,
>({
  schema,
  context,
  criteriaMode,
  defaultValues,
  delayError,
  disabled,
  errors,
  mode,
  progressive,
  reValidateMode,
  resetOptions,
  shouldFocusError,
  shouldUnregister,
  shouldUseNativeValidation,
  values,
  resolverOption,
}: {
  schema: T;
  resolverOption?: {
    schemaOptions?: Partial<z.ParseParams>;
    factoryOptions?: {
      mode?: "async" | "sync";
      raw?: boolean;
    };
  };
} & Omit<UseFormProps<z.infer<T>>, "resolver">) =>
  _useForm<z.infer<T>, TContext, TTransformedValues>({
    resolver: zodResolver(
      schema,
      resolverOption?.schemaOptions,
      resolverOption?.factoryOptions,
    ),
    defaultValues,
    context,
    criteriaMode,
    delayError,
    disabled,
    errors,
    mode: mode ?? "onSubmit",
    progressive,
    resetOptions,
    reValidateMode: reValidateMode ?? "onChange",
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    values,
  });

export default useForm;
