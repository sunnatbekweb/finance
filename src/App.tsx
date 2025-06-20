import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "./components/layouts/sidebar/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const rawRefreshToken = localStorage.getItem("refresh_token");
  const refreshToken = rawRefreshToken ? JSON.parse(rawRefreshToken) : null;

  useEffect(() => {
    setTimeout(() => {
      if (!refreshToken) {
        navigate("/login");
      } else {
        axios
          .post(`${import.meta.env.VITE_BASE_URL}/api/token/refresh/`, {
            refresh: refreshToken,
          })
          .then((response) => {
            localStorage.setItem(
              "access_token",
              JSON.stringify(response.data.access)
            );
          })
          .catch(() => {
            navigate("/login");
          });
      }
    }, 1000);
  }, [navigate, refreshToken]);

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <div className="w-full p-5">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </SidebarProvider>
  );
}

export default App;
