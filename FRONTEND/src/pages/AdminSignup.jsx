import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/adminSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });

  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, secretKey } = form;

    if (!name || !email || !password || !secretKey) {
      return alert("All fields are required");
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/admin/register", {
        name,
        email,
        password,
        secretKey,
      });

      dispatch(loginSuccess(res.data));
      alert("Admin registered successfully!");
      navigate("/admin/home");
    } catch (err) {
      alert(err?.response?.data?.message || "Admin registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="secretKey"
          placeholder="Secret Key"
          value={form.secretKey}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register as Admin"}
        </button>
      </form>
    </div>
  );
}

export default AdminSignup;
