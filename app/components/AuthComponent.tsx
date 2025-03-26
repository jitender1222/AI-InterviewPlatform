"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up" ? z.string().min(3).max(30) : z.string().optional(),
    email: z.string().email(),
    password: z.string(),
  });
};

const AuthComponent = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully");
        router.push("/sign-in");
        console.log("signup", values);
      } else {
        toast.success("Signin successfully");
        router.push("/");
        console.log("signin", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something Went Wrong${error}`);
    }
  }
  const isSign = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-16 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice Job Interviews With AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSign && (
              <FormField
                control={form.control}
                name="name"
                label="Username"
                placeholder="Enter your name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSign ? "Sign in" : "Create An Account"}
            </Button>
          </form>
          <p className="text-center">
            {isSign ? "No account yet" : "Have an account"}

            <Link
              href={!isSign ? "/sign-in" : "/sign-up"}
              className="font-bold text-user-primary ml-1"
            >
              {!isSign ? "signin" : "signup"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthComponent;
