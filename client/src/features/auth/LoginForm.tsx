import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await loginUser(email, password);

      localStorage.setItem(
        "accessToken",
        res.accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

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
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800"
        >
          {loading ? "Signing In..." : "Login"}
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