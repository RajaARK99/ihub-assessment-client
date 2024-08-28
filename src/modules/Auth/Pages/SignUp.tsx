import { toast } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Form } from "react-hook-form";

import { useForm } from "@/global";
import { axiosInstance } from "@/global/config/axios";

import { signUpFormSchema, SignUpForm, SignUpResponse } from "@/modules/Auth";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { Input } from "@/components/Form";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();

  const { control } = useForm({
    schema: signUpFormSchema,
  });

  const { mutate, isPending } = useMutation<
    SignUpResponse,
    AxiosError<{ code: number; message: string }>,
    SignUpForm
  >({
    mutationKey: ["sign-up"],
    mutationFn: (data) => {
      return axiosInstance.post("/auth/sign-up", data);
    },
    onError: ({ message, response }) => {
      toast.error(`SignUp failed. ${response?.data?.message ?? message ?? ""}`);
    },
    onSuccess: () => {
      navigate({
        to: "/sign-in",
        replace: true,
      });
    },
  });

  return (
    <Form
      control={control}
      onSubmit={({ data }) => {
        mutate(data);
      }}
      className="grid place-content-center min-h-screen"
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              inputType="controlled"
              control={control}
              name="firstName"
              label={"First name"}
              placeholder="John doe"
            />
            <Input
              inputType="controlled"
              control={control}
              name="lastName"
              label={"Last Name"}
              placeholder="John doe"
            />
            <Input
              inputType="controlled"
              control={control}
              name="email"
              label={"Email"}
              placeholder="m@example.com"
              type="email"
            />
            <Input
              inputType="controlled"
              control={control}
              name="mobileNumber"
              label={"Mobile"}
              placeholder="Mobile..."
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
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/sign-in"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default SignUp;
