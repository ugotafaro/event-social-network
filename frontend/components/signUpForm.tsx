"use client";

import { createUser, logInUser } from "@/services/auth.service";
import { Alert, Button, Input } from "@mui/material";
import { create } from "domain";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await createUser(email, password).then(() => {
        router.push("/");
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="example@mail.com"
          className="input input-bordered bg-white w-full max-w-xs"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered bg-white w-full max-w-xs"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered bg-white w-full max-w-xs"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}
      <div className="w-full">
        <button className="btn btn-block text-white" type="submit">
          Create account
        </button>
      </div>
    </form>
  );
};
