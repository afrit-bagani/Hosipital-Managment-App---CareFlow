import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routers";
import { supabase } from "./supabaseClient";
import { Toaster } from "sonner";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(session);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  );
}
export default App;
