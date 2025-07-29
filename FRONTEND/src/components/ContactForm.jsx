import { useState } from "react";
import axios from "../api/auth.js";
import { useNavigate } from "react-router-dom";

function ContactForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-green-600">Contact Us</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        rows={4}
        className="w-full p-2 mb-4 border rounded"
        required
      ></textarea>
      <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Send
      </button>
    </form>
  );
}

export default ContactForm;
