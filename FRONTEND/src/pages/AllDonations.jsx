// src/pages/AllDonations.jsx
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../api/auth.js";

function AllDonations() {
  const user = useSelector((state) => state.user.user);
  const [donations, setDonations] = useState([]); 

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/donations/all/${user.email}`) 
        .then((res) =>{
          //console.log(res.data);
           setDonations(res.data)
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Donations</h1>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <ul className="space-y-4">
          {donations.map((donation) => (
            <li
              key={donation._id}
              className="bg-white shadow-md p-4 rounded border"
            >
              <p><strong>Amount:</strong> ₹{donation.amount}</p>
              <p><strong>Date:</strong> {new Date(donation.createdAt).toLocaleString()}</p>
              <p><strong>Campaign:</strong> {donation.category+" Protection Campaign"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllDonations;
