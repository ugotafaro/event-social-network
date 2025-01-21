"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { userInfosAtom } from "../atoms/user.atom";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userInfos] = useAtom(userInfosAtom);

  return <div className="text-white">Homepage</div>;
}
