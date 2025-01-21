import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 text-slate-900 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl ">Login</h1>
        <LoginForm />
        <p className="text-center">
          Need to create an account?{" "}
          <Link className="text-indigo-500 hover:underline" href="/signup">
            Create Account
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
