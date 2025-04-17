import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/layouts/sidebar/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default App;
