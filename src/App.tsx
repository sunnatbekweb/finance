import { Outlet, Navigate } from "react-router-dom";
import { AppSidebar } from "./components/layouts/sidebar/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

function App() {
  const { accessToken, isLoading } = useAuth();

  // Показываем "Loading..." если данные загружаются
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Если нет токена, редиректим на страницу входа
  if (!accessToken) {
    return <Navigate to="/login" />;
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
