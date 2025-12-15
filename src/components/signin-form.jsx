import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router
import { cn } from "@/lib/utils";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Assuming you have a Label component or use standard label
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

export function SigninForm({ className, ...props }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      navigate("/dashboard"); // Redirect on success
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleEmailLogin}>
          <div className="grid gap-4">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="focus-visible:ring-blue-600"
              />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm text-blue-600 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="focus-visible:ring-blue-600"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-sm text-red-500 text-center">{errorMsg}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Login with Google
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <a
          href="/sign-up"
          className="font-semibold text-blue-600 hover:underline"
        >
          Sign up
        </a>
      </div>
    </div>
  );
}
