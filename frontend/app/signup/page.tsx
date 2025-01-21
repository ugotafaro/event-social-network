import { LoginForm } from "@/components/LoginForm";
import { SignUpForm } from "@/components/signUpForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl my-3 px-8 pb-8 pt-12 text-slate-900 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl ">Sign up</h1>
        <SignUpForm />
        <p className="text-center">
          You already have an account ?{" "}
          <Link className="text-indigo-500 hover:underline" href="/login">
            Log in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
