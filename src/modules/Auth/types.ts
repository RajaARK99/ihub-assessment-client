/* eslint-disable @typescript-eslint/ban-types */
import { z } from "zod";

import {
  forgetPasswordEmailFormSchema,
  forgetPasswordResetPasswordSchema,
  signInFormSchema,
  signUpFormSchema,
  verifyOTPFormSchema,
} from "@/modules/Auth";
import { User } from "@/modules/Users";

import { Nullish } from "@/types";

type SignInForm = z.infer<typeof signInFormSchema>;

type SignInResponse = Nullish<{
  data?: {
    token: {
      tokenType: string;
      accessToken: string;
      refreshToken: string;
      expiresIn: string;
    };
    user: User | null;
  } | null;
}>;

type SignUpForm = z.infer<typeof signUpFormSchema>;

type SignUpResponse = Nullish<{
  message: string;
}>;

type VerifyOTPForm = z.infer<typeof verifyOTPFormSchema>;

type VerifyOTPResponse = Nullish<{
  data?: {
    token: {
      tokenType: string;
      accessToken: string;
      refreshToken: string;
      expiresIn: string;
    };
    user: User | null;
  } | null;
}>;

type ForgetPasswordEmailForm = z.infer<typeof forgetPasswordEmailFormSchema>;

type ResetPasswordForm = z.infer<typeof forgetPasswordResetPasswordSchema>;

export type {
  SignInForm,
  SignInResponse,
  SignUpForm,
  SignUpResponse,
  VerifyOTPForm,
  VerifyOTPResponse,
  ForgetPasswordEmailForm,
  ResetPasswordForm,
};
