import { SidebarTrigger } from "@/components/ui/sidebar";

export const Dashboard = () => {
  return (
    <div className="flex items-center gap-x-5">
      <SidebarTrigger />
      <h2 className="font-bold text-2xl">Dashboard</h2>
    </div>
  );
};
