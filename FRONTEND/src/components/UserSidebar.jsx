import { Link, useLocation } from "react-router-dom";

function UserSidebar() {
  const location = useLocation();

  return (
    <div className="w-72 min-h-screen bg-white shadow-md border-r px-5 py-6 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 text-blue-600">My Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link
          to="/my-donations"
          className={`px-3 py-2 rounded font-medium text-gray-700 hover:bg-blue-100 ${
            location.pathname === "/my-donations" ? "bg-blue-200 text-blue-800" : ""
          }`}
        >
          All Donations
        </Link>
        <Link
          to="/todays-donations"
          className={`px-3 py-2 rounded font-medium text-gray-700 hover:bg-blue-100 ${
            location.pathname === "/todays-donations" ? "bg-blue-200 text-blue-800" : ""
          }`}
        >
          Today's Donations
        </Link>
      </nav>
    </div>
  );
}

export default UserSidebar;
