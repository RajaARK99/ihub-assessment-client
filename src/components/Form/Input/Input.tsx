import { useState } from "react";
import { composeRenderProps, Text } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { Eye, EyeOff, XIcon } from "lucide-react";

import { FieldError, Label } from "@/components/Field";
import {
  TextField,
  TextFieldButton,
  TextFieldGroup,
  TextFieldInput,
} from "@/components/Input";
import { InputProps } from "@/components/Form/Input";

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
  type,
  label,
  name,
  clearable,
  defaultValue,
  description,
  leadingContent,
  placeholder,
  trailingContent,
  error,
  inputType,
}: Omit<InputProps, "control" | "shouldUnregister"> & {
  error?: { message?: string } | undefined;
  invalid?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const changePasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      type={type === "password" ? (showPassword ? "text" : "password") : type}
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
      <TextFieldGroup>
        {leadingContent && typeof leadingContent === "function"
          ? leadingContent(value)
          : leadingContent}

        <TextFieldInput
          onBlur={() => {
            onChange?.(value?.trim() ?? "");
          }}
          placeholder={placeholder}
        />
        {value && clearable && inputType === "controlled" && (
          <TextFieldButton
            slot={null}
            onPress={() => {
              onChange?.(null);
            }}
          >
            <XIcon aria-hidden className="size-4" />
          </TextFieldButton>
        )}
        {type === "password" && (
          <TextFieldButton slot={null} onPress={changePasswordHandler}>
            {showPassword ? (
              <EyeOff aria-hidden className="size-4" />
            ) : (
              <Eye aria-hidden className="size-4" />
            )}
          </TextFieldButton>
        )}
        {trailingContent && typeof trailingContent === "function"
          ? trailingContent(value)
          : trailingContent}
      </TextFieldGroup>
      {!error?.message && description && (
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

const Input = <
  TFieldValue extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValue> = FieldPath<TFieldValue>
>({
  name,
  control,
  type,
  label,
  description,
  defaultValue,
  clearable = true,
  disabled,
  onChange,
  placeholder,
  readOnly,
  shouldUnregister,
  className,
  maxLength,
  minLength,
  leadingContent,
  trailingContent,
  inputType,
}: InputProps<TFieldValue, Name>) => {
  return inputType === "normal" ? (
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
      maxLength={maxLength}
      minLength={minLength}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      trailingContent={trailingContent}
      type={type}
      inputType={inputType}
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
            maxLength={maxLength}
            minLength={minLength}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            trailingContent={trailingContent}
            type={type}
            inputType={inputType}
            value={value}
            invalid={invalid}
          />
        );
      }}
    />
  );
};

export { Input };
