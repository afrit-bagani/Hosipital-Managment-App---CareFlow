import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SignupForm({ className, ...props }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle Email/Password Signup
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name, // Saves the name to the user's metadata
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      if (data.session) {
        navigate("/");
      } else {
        toast.success(
          "Success! Please check your email to verify your account."
        );
      }
    } catch (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <form
      onSubmit={handleEmailSignup}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h1>
        <p className="text-muted-foreground text-sm text-gray-500">
          Join CareFlow today to manage your medical schedule
        </p>
      </div>

      <FieldGroup className="grid gap-4">
        {/* Name Field */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Dr. John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="focus-visible:ring-blue-600"
          />
        </Field>

        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@hospital.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="focus-visible:ring-blue-600"
          />
        </Field>

        {/* Password Field */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="focus-visible:ring-blue-600"
          />
          <FieldDescription className="text-xs text-gray-400 mt-1">
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        {/* Error Message Display */}
        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100 text-center">
            {errorMsg}
          </div>
        )}

        {/* Submit Button */}
        <Field>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </Field>

        <FieldSeparator className="my-2">Or continue with</FieldSeparator>

        {/* Google Signup Button */}
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleSignup}
            className="w-full hover:bg-gray-50"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>

          <FieldDescription className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-blue-600 hover:underline hover:text-blue-700"
            >
              Sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
