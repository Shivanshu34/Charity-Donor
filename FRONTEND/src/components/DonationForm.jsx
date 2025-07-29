import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../api/auth.js";

function DonationForm() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [category, setCategory] = useState("Animal Protection");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      setDonorEmail(user.email);
      setAnonymous(false);
    } 
    // else {
    //   setDonorEmail("");
    // }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!anonymous && !user) {
      alert("You must be logged in to donate with your name/email.");
      return navigate("/login");
    }

    try {
      const res = await axios.post("/api/donations/", {
        donorName: anonymous ? "Anonymous" : donorName,
        donorEmail: anonymous ? "anonymous@donation.com" : donorEmail,
        anonymous,
        category,
        amount: Number(amount),
        message,
      });

      alert("Donation successful!");
      setDonorName("");
      setAnonymous(false);
      setCategory("Animal Protection");
      setAmount("");
      setMessage("");

      if (!anonymous && user) {
        setDonorEmail(user.email); // Refill email after reset
      } else {
        setDonorEmail("");
      }
    } catch (err) {
      console.error(err);
      alert("Donation failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-5"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Make a Donation</h2>

     {user &&  <div>
        <label className="block font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={anonymous ? "" : donorName}
          onChange={(e) => setDonorName(e.target.value)}
          disabled={anonymous}
          placeholder="Your Name"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required={!anonymous}
        />
      </div> 
      }

      {user && <div>
        <label className="block font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={anonymous ? "" : donorEmail}
          disabled={!!user || anonymous}
          placeholder="Your Email"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required={!anonymous}
        />
      </div>
      }

      {user && <div className="flex items-center">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm text-gray-700">Donate Anonymously</label>
      </div>
      }
      
      <div>
        <label className="block font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="Animal Protection">Animal Protection</option>
          <option value="Education">Education</option>
          <option value="Child Support">Child Support</option>
          <option value="Anti Drugs">Anti Drugs</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Message (optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-semibold"
      >
        Donate
      </button>
    </form>
  );
}

export default DonationForm;
