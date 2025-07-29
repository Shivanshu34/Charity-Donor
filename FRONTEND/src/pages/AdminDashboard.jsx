// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "../api/auth.js";
import { useSelector } from "react-redux";

const categories = ["Animal Protection", "Education", "Child Support", "Anti Drugs"];

export default function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [donations, setDonations] = useState([]);
  const admin = useSelector((state) => state.admin.currentAdmin);
  const token = useSelector((state) => state.admin.token);

  useEffect(() => {
    if (selectedCategory && admin && token) {
      axios
        .get(`/api/admin/donations?category=${encodeURIComponent(selectedCategory)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setDonations(res.data)) 
        .catch((err) => console.error(err));
    }
  }, [selectedCategory, admin, token]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Admin Dashboard</h2>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer bg-white border rounded-2xl shadow-md p-4 text-center hover:bg-blue-100 ${
              selectedCategory === cat ? "border-blue-500" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800">{cat}</h3>
          </div>
        ))}
      </div>

      {/* Donations Table */}
      {selectedCategory && (
        <>
          <h3 className="text-xl font-bold mb-4 text-green-700">
            Donations for: {selectedCategory}
          </h3>
          {donations.length === 0 ? (
            <p>No donations found in this category.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Donor Name</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Anonymous</th>
                  <th className="border p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="border p-2">{d.anonymous ? "Anonymous" : d.donorName}</td>
                    <td className="border p-2">₹{d.amount}</td>
                    <td className="border p-2">{d.anonymous ? "Yes" : "No"}</td>
                    <td className="border p-2">
                      {new Date(d.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
