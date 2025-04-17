import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "./components/layouts/sidebar/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function App() {
  const { accessToken, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading && accessToken === null) {
      navigate("/login");
    }
  }, [isLoading, accessToken, navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <div className="w-full p-5">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
