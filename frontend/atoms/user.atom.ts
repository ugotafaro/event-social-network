import { atom } from "jotai";
import { User } from "../app/types/user.type";

export const isLoggedAtom = atom(false);
export const userInfosAtom = atom<User | null>(null);
export const hasUserLoadedAtom = atom<boolean>(false);
