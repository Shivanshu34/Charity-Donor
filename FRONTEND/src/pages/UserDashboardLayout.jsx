import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

export default function UserDashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <UserSidebar />
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
