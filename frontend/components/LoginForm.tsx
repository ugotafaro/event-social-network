"use client";

import { isLoggedAtom, userInfosAtom } from "@/atoms/user.atom";
import { logInUser } from "@/services/auth.service";
import { Alert, Button, Input } from "@mui/material";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("email", email);
      console.log("password", password);
      await logInUser(email, password).then((response) => {
        setUserInfos({ ...response });
        setIsLogged(true);
      });
      router.push("/");
      console.log("userInfos", userInfos);
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
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <button className="btn btn-block">Login</button>
      </div>
    </form>
  );
};
