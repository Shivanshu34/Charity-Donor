import { Link } from "react-router-dom";
import lukeImage from "../assets/luke.jpg";

export default function AdminHome() {
  return (
    <div className="text-center p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Welcome, Admin</h2>
      <p className="text-gray-700 mb-6">
        Manage and monitor all donation activities efficiently from your dashboard.
      </p>

      {/* Centered and aligned image */}
      <div className="max-w-4xl mx-auto mb-8">
        <div
          className="rounded-xl shadow-md w-full h-[300px] overflow-hidden"
          style={{
            backgroundImage: `url(${lukeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 text-left">
          <Link to="/admin/all-donations">
            <h3 className="text-xl font-semibold text-blue-600 mb-2 hover:underline">
              All Donations
            </h3>
          </Link>
          <p className="text-gray-600">
            View and track all past and present donations made by users. Filter by date, amount, or user.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-left">
          <Link to="/admin/today-donations">
            <h3 className="text-xl font-semibold text-blue-600 mb-2 hover:underline">
              Today's Donations
            </h3>
          </Link>
          <p className="text-gray-600">
            Get a quick overview of donations received today and stay updated in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
