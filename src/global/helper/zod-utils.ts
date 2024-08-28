import { DateValue } from "@internationalized/date";
import { z } from "zod";

const defaultZodErrorMessage = {
  invalid_type_error: "This is required field.",
  required_error: "This is required field.",
};

const emailZodSchema = (isRequired: boolean = false) =>
  z
    .string(defaultZodErrorMessage)
    .trim()
    .min(1, { message: defaultZodErrorMessage.required_error })
    .email({
      message: "Invalid email",
    })
    .superRefine((val, { addIssue }) => {
      if (
        isRequired &&
        (val?.length === 0 || val === null || val === undefined)
      ) {
        addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          message: defaultZodErrorMessage.required_error,
          inclusive: true,
          type: "string",
        });
      }
      if (val?.trim()?.length > 0) {
        const isValid = () => {
          try {
            z.string().email(val?.trim());
            return true;
          } catch {
            return false;
          }
        };

        if (!isValid()) {
          addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid email.",
          });
        }
      }
    });

const passwordZodSchema = z
  .string(defaultZodErrorMessage)
  .superRefine((val, { addIssue }) => {
    if (val?.length === 0 || val === null || val === undefined) {
      addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        message: defaultZodErrorMessage.required_error,
        inclusive: true,
        type: "string",
      });
    }
    if (val?.length < 8) {
      addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        message: "Minimum length should be 8",
        inclusive: true,
        type: "string",
      });
    }
  });

const nameZodSchema = (isRequired: boolean = false, minlength: number = 1) =>
  z
    .string(defaultZodErrorMessage)
    .trim()
    .superRefine((val, { addIssue }) => {
      if (
        isRequired &&
        (val?.length === 0 || val === null || val === undefined)
      ) {
        addIssue({
          code: z.ZodIssueCode.custom,
          message: defaultZodErrorMessage.required_error,
        });
      }
      if (val?.length > 0 && val?.length < minlength) {
        addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: minlength,
          message: `Minimum length should be ${minlength}`,
          inclusive: true,
          type: "string",
        });
      }
    });

const idAndLabelSchema = <T extends string | number = number>(
  type: z.ZodType<T>
) =>
  z.object(
    {
      id: type,
      label: z.string(),
    },
    defaultZodErrorMessage
  );

const isURL = (data: string | undefined | null) => {
  if (data) {
    try {
      z.string().url().parse(data);
      return true;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

const dateFieldSchema = z.custom<DateValue>((value) => {
  if (value === null || value === undefined) {
    return false;
  }
  return value;
}, defaultZodErrorMessage?.required_error);

export {
  emailZodSchema,
  passwordZodSchema,
  nameZodSchema,
  idAndLabelSchema,
  isURL,
  defaultZodErrorMessage,
  dateFieldSchema,
};
