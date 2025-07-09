import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/layouts/sidebar/sidebar";
import { Header } from "./components/layouts/header/header";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const rawRefreshToken = localStorage.getItem("refresh_token");
  const refreshToken = rawRefreshToken ? JSON.parse(rawRefreshToken) : null;
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col w-full">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="p-2.5 md:p-5">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
