import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice.js";
import { loginUser } from "../api/auth.js";

function LoginForm() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ 
        email:emailOrUsername,
        password,
      });

      dispatch(loginSuccess({ user: data.user, token: data.token }));
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto bg-white p-6 shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4 text-green-600">Login</h2>
      <input
        type="text"
        placeholder="Email or Username"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
