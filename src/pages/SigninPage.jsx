import { SigninForm } from "@/components/signin-form";
import { Activity } from "lucide-react"; // Make sure to install lucide-react if needed

export default function SigninPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* --- Left Side: Form Section --- */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="/"
            className="flex items-center gap-2 font-bold text-blue-600"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
              <Activity className="size-4" />
            </div>
            CareFlow
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SigninForm />
          </div>
        </div>
      </div>

      {/* --- Right Side: Visual Section (Hidden on Mobile) --- */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop"
          alt="Hospital Team"
          className="absolute inset-0 h-full w-full object-cover opacity-90 brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-blue-900/20" /> {/* Blue Overlay */}
        <div className="absolute bottom-10 left-10 text-white p-6 max-w-lg">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;CareFlow has completely transformed how we manage our
              surgical schedules. The efficiency we've gained allows us to focus
              entirely on patient care.&rdquo;
            </p>
            <footer className="text-sm opacity-80">
              Dr. Sofia Davis, Chief of Surgery
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
