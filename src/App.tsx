import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-[40px] font-semibold text-center text-[#1E1E1E] mb-6">
          <span className="font-normal">Welcome to the</span> <br />
          Financial Management Dashboard
        </h1>
        <Link to={"/signup"} className="block font-semibold text-2xl text-[#f8c023] text-center">Start</Link>
      </div>
    </div>
  );
}

export default App;
