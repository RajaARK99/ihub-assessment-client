import { toast } from "sonner";
import { AxiosError } from "axios";
import { Form } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { flushSync } from "react-dom";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "@/components";

import { useForm, axiosInstance } from "@/global";

import { SignInForm, signInFormSchema, SignInResponse } from "@/modules/Auth";
import { Input } from "@/components/Form";

const SignIn = () => {
  const navigate = useNavigate();

  const { control } = useForm({
    schema: signInFormSchema,
  });

  const { setToken, setUser } = useAuth();

  const { mutate, isPending } = useMutation<
    SignInResponse,
    AxiosError<{ code: number; message: string }>,
    SignInForm
  >({
    mutationKey: ["sign-in"],
    mutationFn: (data) => {
      return axiosInstance.post("/auth/login", data);
    },
    onError: ({ response, message }) => {
      toast.error(`SignIn failed. ${response?.data?.message ?? message ?? ""}`);
    },
    onSuccess: ({ data }) => {
      const user = data?.user;
      const token = data?.token?.accessToken;

      if (user?.id && token) {
        localStorage?.setItem("token", token);
        localStorage?.setItem("user", JSON.stringify(user));
        flushSync(() => {
          setUser(user);
          setToken(token);
        });
        setTimeout(() => {
          navigate({
            to: "/home",
            replace: false,
            search: {
              page: 1,
              limit: 10,
            },
          });
        }, 10);
      }
    },
  });

  return (
    <Form
      control={control}
      onSubmit={({ data }) => {
        mutate({
          email: data?.email,
          password: data?.password,
        });
      }}
      className="grid place-content-center min-h-screen"
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              inputType="controlled"
              control={control}
              name="email"
              label={"Email"}
              placeholder="m@example.com"
            />
            <Input
              inputType="controlled"
              control={control}
              name="password"
              label={"Password"}
              type="password"
              placeholder="••••••••"
            />

            <Button type="submit" className="w-full" isDisabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default SignIn;
