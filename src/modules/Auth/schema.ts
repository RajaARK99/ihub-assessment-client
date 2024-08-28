import { z } from "zod";

import { emailZodSchema, nameZodSchema, passwordZodSchema } from "@/global";

const signInFormSchema = z.object({
  email: emailZodSchema(true),
  password: passwordZodSchema,
});

const signUpFormSchema = z.object({
  name: nameZodSchema(true),
  email: emailZodSchema(true),
  password: passwordZodSchema,
  companyName: nameZodSchema(true),
});

const verifyOTPFormSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Enter valid otp." })
    .max(6, { message: "Enter valid otp." }),
});

const forgetPasswordEmailFormSchema = z.object({
  email: emailZodSchema(true),
});

const forgetPasswordSearchSchema = z.object({
  email: emailZodSchema(true),
  resetToken: nameZodSchema(true, 50),
});

const forgetPasswordResetPasswordSchema = z.object({
  password: passwordZodSchema,
});

export {
  signInFormSchema,
  signUpFormSchema,
  verifyOTPFormSchema,
  forgetPasswordEmailFormSchema,
  forgetPasswordSearchSchema,
  forgetPasswordResetPasswordSchema,
};
