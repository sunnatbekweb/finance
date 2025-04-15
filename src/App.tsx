import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Outlet />
    </div>
  );
}

export default App;
