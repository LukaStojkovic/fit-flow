"use client";

import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthSocialButton } from "@/app/(site)/_components/AuthSocialButton";
import { BsGithub } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  function onSubmit(data) {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => signIn("credentials", data))
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  }

  const socialAction = (action) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged In!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-96 p-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Create an Account
        </h2>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 dark:text-white bg-white dark:bg-gray-800"
            {...register("name", { required: "Please provide your name." })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs ">{errors.name.message}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 dark:text-white bg-white dark:bg-gray-800"
            {...register("email", {
              required: "Please enter a email address.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs ">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 dark:text-white bg-white dark:bg-gray-800"
            {...register("password", {
              required: "Please enter a password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Must include at least one uppercase letter, one lowercase letter, and one number.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs ">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all dark:bg-gray-700 dark:hover:bg-gray-600"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 whitespace-nowrap">
              Or continue with
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-gray-900 font-medium hover:underline dark:text-white"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
