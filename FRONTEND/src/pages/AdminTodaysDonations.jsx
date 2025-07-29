import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../api/auth.js";

function isToday(dateStr) {
  const donationDate = new Date(dateStr);
  const today = new Date();
  return (
    donationDate.getDate() === today.getDate() &&
    donationDate.getMonth() === today.getMonth() &&
    donationDate.getFullYear() === today.getFullYear()
  );
}

function AdminTodaysDonations(){
    const [donations, setDonations] = useState([]);
    const admin = useSelector((state) => state.admin.currentAdmin);
    const token = useSelector((state) => state.admin.token);

     useEffect(() => {
    if (admin && token) {
      axios
        .get("/api/admin/donations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const filtered = res.data.filter((donation) =>
            isToday(donation.createdAt)
          );
          setDonations(filtered);
        })
        .catch((err) => console.error(err));
    }
  }, [admin]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Today's Donations</h2>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Donor Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Anonymous</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d, idx) => (
              <tr key={idx} className="text-center">
                <td className="border p-2">{d.anonymous ? "Anonymous" : d.donorName}</td>
                <td className="border p-2">₹{d.amount}</td>
                <td className="border p-2">{d.category || "-"}</td>
                <td className="border p-2">{d.anonymous ? "Yes" : "No"}</td>
                <td className="border p-2">
                  {new Date(d.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      )}
    </div>
  );

}

export default AdminTodaysDonations;