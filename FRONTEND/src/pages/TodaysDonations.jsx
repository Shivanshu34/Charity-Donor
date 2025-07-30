// src/pages/TodaysDonations.jsx
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

function TodaysDonations() {
  const user = useSelector((state) => state.user.user);
  const [todayDonations, setTodayDonations] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/donations/all/${user.email}`) 
        .then((res) => {
          const filtered = res.data.filter((donation) =>
            isToday(donation.createdAt)
          );
          setTodayDonations(filtered);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Today's Donations</h1>
      {todayDonations.length === 0 ? (
        <p>No donations made today.</p>
      ) : (
        <ul className="space-y-4">
          {todayDonations.map((donation) => (
            <li
              key={donation._id}
              className="bg-white shadow-md p-4 rounded border"
            >
              <p><strong>Amount:</strong> ₹{donation.amount}</p>
              <p><strong>Time:</strong> {new Date(donation.createdAt).toLocaleTimeString()}</p>
              <p><strong>Campaign:</strong> {donation.category+" Protection Campaign"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodaysDonations;
