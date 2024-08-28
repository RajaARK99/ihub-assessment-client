import { z } from "zod";

import { emailZodSchema, nameZodSchema, passwordZodSchema } from "@/global";
import { roleEnum } from "../Users";

const signInFormSchema = z.object({
  email: emailZodSchema(true),
  password: passwordZodSchema,
});

const signUpFormSchema = z.object({
  firstName: nameZodSchema(true),
  lastName: nameZodSchema(true),
  email: emailZodSchema(true),
  password: passwordZodSchema,
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, {
    message:
      "Invalid  mobile number. It should start with 6-9 and be 10 digits long.",
  }),
  role: roleEnum.nullish(),
});

export { signInFormSchema, signUpFormSchema };
