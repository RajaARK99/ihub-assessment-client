import { composeRenderProps, Text } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { FieldError, Label } from "@/components/Field";
import { TextField, TextArea as TextAriaComponent } from "@/components/Input";
import { TextAreaProps } from "@/components/Form/TextArea";

import { cn } from "@/global";

const Component = ({
  value,
  className,
  onChange,
  disabled,
  invalid,
  readOnly,
  maxLength,
  minLength,
  label,
  name,
  defaultValue,
  description,
  placeholder,
  error,
  textAreaClassName,
}: Omit<TextAreaProps, "control" | "shouldUnregister" | "type"> & {
  error?: { message?: string } | undefined;
  invalid?: boolean;
}) => {
  return (
    <TextField
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className)
      )}
      value={value ?? ""}
      onChange={onChange}
      isDisabled={disabled}
      isInvalid={invalid}
      isReadOnly={readOnly}
      maxLength={maxLength}
      minLength={minLength}
      defaultValue={defaultValue ?? ""}
    >
      {label && (
        <Label
          htmlFor={name}
          className={typeof label === "object" ? label?.className : ""}
        >
          {typeof label === "string" ? label : label?.text}
        </Label>
      )}
      <TextAriaComponent
        onBlur={() => {
          onChange?.(value?.trim() ?? "");
        }}
        placeholder={placeholder}
        className={textAreaClassName}
      />
      {description && (
        <Text
          slot="description"
          className={cn(
            "text-sm text-muted-foreground",
            typeof description === "object" ? description?.className : ""
          )}
        >
          {typeof description === "string" ? description : description?.text}
        </Text>
      )}
      {error?.message && <FieldError>{error?.message}</FieldError>}
    </TextField>
  );
};

const TextArea = <
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
>({
  name,
  control,
  label,
  description,
  defaultValue,
  disabled,
  onChange,
  placeholder,
  readOnly,
  shouldUnregister,
  className,
  maxLength,
  minLength,
  type,
  textAreaClassName,
}: TextAreaProps<TFieldValue, Name>) => {
  return type === "normal" ? (
    <Component
      name={name}
      className={className}
      defaultValue={defaultValue}
      description={description}
      disabled={disabled}
      error={undefined}
      label={label}
      maxLength={maxLength}
      minLength={minLength}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      textAreaClassName={textAreaClassName}
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
            defaultValue={defaultValue}
            description={description}
            disabled={disabled}
            error={error}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            value={value}
            textAreaClassName={textAreaClassName}
            invalid={invalid}
          />
        );
      }}
    />
  );
};

export { TextArea };
