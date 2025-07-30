import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice.js";

function Navbar() {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
 
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

   const handleLogout2 = () => {
    dispatch(logout());
    navigate("/dashboard"); 
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-green-600">NGO Charity</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
        <Link to="/donate" className="text-gray-700 hover:text-green-600">{user ? "Donate": "DonateAnonymously"}</Link>
        <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
        <button
            onClick={handleLogout2}
            className="text-gray-700 hover:text-green-600"
        >
          Dashboard
        </button>
        {token && user ? (
          <>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-green-600">Login</Link>
            <Link to="/signup" className="text-gray-700 hover:text-green-600">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
