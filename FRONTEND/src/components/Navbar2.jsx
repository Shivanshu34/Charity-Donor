import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAdmin } from "../store/adminSlice"; // <-- Correct action

function Navbar2() {
  const currentAdmin = useSelector((state) => state.admin.currentAdmin); // <-- FIXED
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin()); // <-- FIXED
    navigate("/dashboard"); 
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-red-600">Admin Panel</h1>
      <div className="space-x-4">
        <Link to="/admin/dashboard" className="text-gray-700 hover:text-red-600">Category Donations</Link>
        <Link to="/admin/home" className="text-gray-700 hover:text-red-600">Home</Link>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-600"
        >
          Dashboard
        </button>
        {!currentAdmin ? (
          <>
            <Link to="/admin/login" className="text-gray-700 hover:text-red-600">Login</Link>
            <Link to="/admin/signup" className="text-gray-700 hover:text-red-600">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-gray-700 hover:text-red-600">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar2;
