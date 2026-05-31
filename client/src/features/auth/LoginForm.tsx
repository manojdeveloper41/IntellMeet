import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Welcome Back
        </h2>

        <p className="mt-2 text-slate-500">
          Sign in to continue to IntellMeet
        </p>
      </div>

      <div className="space-y-4">
        <Input type="email" placeholder="Email Address" />

        <Input type="password" placeholder="Password" />

        <Button className="w-full bg-blue-700 hover:bg-blue-800">
          Login
        </Button>

        <div className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}