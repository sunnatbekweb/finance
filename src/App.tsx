import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/layouts/sidebar/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
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
