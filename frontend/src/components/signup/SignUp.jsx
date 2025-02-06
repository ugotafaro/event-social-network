import { SignUpForm } from "./SignUpForm";
import { Link } from "react-router";

export default function SignUp({ setUser }) {
  return (
    <div className="w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl my-3 px-8 pb-8 pt-12 text-slate-900 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl ">Sign up</h1>
        <SignUpForm setUser={setUser} />
        <p className="text-center">
          You already have an account ?{" "}
          <Link className="text-indigo-500 hover:underline" to="/login">
            Log in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
