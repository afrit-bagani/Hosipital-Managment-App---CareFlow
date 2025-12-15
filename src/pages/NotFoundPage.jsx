import React from "react";
import { Link } from "react-router-dom";
import { FileQuestion, Activity, Home } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have this component

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {/* Icon / Brand Animation */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 p-6 shadow-sm">
        <FileQuestion className="h-12 w-12 text-blue-600" />
      </div>

      {/* 404 Text */}
      <h1 className="mb-2 text-9xl font-extrabold text-blue-600 opacity-90">
        404
      </h1>

      {/* Title & Description */}
      <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-gray-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might
        have been removed, renamed, or doesn&apos;t exist.
      </p>

      {/* Action Button */}
      <Link to="/dashboard">
        <Button className="flex items-center gap-2 bg-blue-600 px-8 py-6 text-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
          <Home className="h-5 w-5" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Footer / Brand */}
      <div className="mt-12 flex items-center gap-2 text-gray-400 opacity-70">
        <Activity className="h-4 w-4" />
        <span className="text-sm font-semibold">
          CareFlow Hospital Management
        </span>
      </div>
    </div>
  );
}
