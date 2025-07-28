import { useState } from "react";
import { Sidebar } from "@/widgets/Sidebar";
import { Header } from "@/widgets/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
