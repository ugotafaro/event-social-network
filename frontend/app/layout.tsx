"use client";
import "./globals.css";
import { useAtom } from "jotai";
import {
  hasUserLoadedAtom,
  isLoggedAtom,
  userInfosAtom,
} from "../atoms/user.atom";
import { getUserAuthenticated } from "@/services/auth.service";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [hasUserLoaded, setHasUserLoaded] = useAtom(hasUserLoadedAtom);
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);

  // const router = useRouter();

  // useEffect(() => {
  //   console.log("isLogged", isLogged);
  //   if (!isLogged) {
  //     router.push("/login");
  //   }
  // }, [isLogged, router]);

  return (
    <html lang="en">
      <body className="h-screen bg-slate-100">{children}</body>
    </html>
  );
}
