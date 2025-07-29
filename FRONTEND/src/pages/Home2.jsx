import { useNavigate } from "react-router-dom";

function Home2() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Welcome to NGO Platform</h1>
      <div className="flex gap-6">
        <div
          className="bg-white p-6 shadow-md rounded cursor-pointer hover:shadow-xl"
          onClick={() => navigate("/admin/login")}
        >
          <h2 className="text-xl font-semibold text-center text-red-600">Admin</h2>
        </div>
        <div
          className="bg-white p-6 shadow-md rounded cursor-pointer hover:shadow-xl"
          onClick={() => navigate("/")}
        >
          <h2 className="text-xl font-semibold text-center text-blue-600">Donor</h2>
        </div>
      </div>
    </div>
  );
}

export default Home2;
