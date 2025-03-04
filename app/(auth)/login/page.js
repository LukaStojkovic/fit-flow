"use client";

import { AuthSocialButton } from "@/app/(site)/_components/AuthSocialButton";
import Link from "next/link";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  function onSubmit(data) {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
          router.push("/");
        }
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
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Sign in to Fit Flow
        </h2>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 dark:text-white bg-white dark:bg-gray-800"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 dark:text-white bg-white dark:bg-gray-800"
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all dark:bg-gray-700 dark:hover:bg-gray-600"
            disabled={isLoading}
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-2 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 whitespace-nowrap">
              Or continue with
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="mt-6 flex gap-4 justify-center">
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
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-gray-900 font-medium hover:underline dark:text-gray-100"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
