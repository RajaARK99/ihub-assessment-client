import { z } from "zod";

import { signInFormSchema, signUpFormSchema } from "@/modules/Auth";
import { User } from "@/modules/Users";

import { Nullish } from "@/types";

type SignInForm = z.infer<typeof signInFormSchema>;

type SignInResponse = Nullish<{
  data?: {
    token: string;
    user: User | null;
  } | null;
}>;

type SignUpForm = z.infer<typeof signUpFormSchema>;

type SignUpResponse = Nullish<User>;

export type { SignInForm, SignInResponse, SignUpForm, SignUpResponse };
