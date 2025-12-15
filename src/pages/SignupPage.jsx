import { Activity } from "lucide-react";
import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* --- Left Side: Form Section --- */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo / Brand Header */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="/"
            className="flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 transition"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm">
              <Activity className="size-4" />
            </div>
            CareFlow
          </a>
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>

      {/* --- Right Side: Visual Section --- */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop"
          alt="Hospital Building"
          className="absolute inset-0 h-full w-full object-cover opacity-90 brightness-[0.85]"
        />
        {/* Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-900/60 to-transparent" />

        {/* Testimonial / Quote */}
        <div className="absolute bottom-10 left-10 text-white p-6 max-w-lg">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed drop-shadow-md">
              &ldquo;Joining CareFlow was the best decision for our department.
              The automated scheduling has reduced our administrative workload
              by 40%.&rdquo;
            </p>
            <footer className="text-sm opacity-90 font-semibold tracking-wide">
              — Dr. James Wilson, Orthopedic Surgeon
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
