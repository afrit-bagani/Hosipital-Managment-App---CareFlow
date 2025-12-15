import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { supabase } from "../supabaseClient";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    }
    navigate("/sign-in");
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          CareFlow
        </span>
      </div>
      <Button onClick={handleLogout} variant="outline">
        Logout
      </Button>
    </header>
  );
}
