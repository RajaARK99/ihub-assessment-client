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
  role: roleEnum.nullish(),
});

export { signInFormSchema, signUpFormSchema };
