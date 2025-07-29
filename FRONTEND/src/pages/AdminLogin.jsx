import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/adminSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

     if (!email || !password) {
      return alert("All fields are required");
    }

    try {
      const { data } = await axios.post("http://localhost:4000/api/auth/admin/login", {
        email,
        password,
      });
      //dispatch(loginSuccess(res.data));
      dispatch(loginSuccess({ admin: data.admin, token: data.token })); 
      navigate("/admin/home"); 
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
