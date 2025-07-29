// Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">Welcome to NGO Charity</h2>
      <p className="text-lg text-gray-700 mb-6 max-w-xl text-center">
        Make a real difference by donating or joining our cause to help those in need.
      </p>
      <div className="flex gap-4 mb-6">
        <Link
          to="/donate"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-semibold"
        >
          Donate Now
        </Link>
        <Link
          to="/about"
          className="bg-white border border-green-600 text-green-700 px-5 py-2 rounded hover:bg-green-50 font-semibold"
        >
          Learn More
        </Link>
      </div>
      <img
        src="src\assets\katt-yukawa-K0E6E0a0R3A-unsplash.jpg"
        alt="Charity Help"
        className="rounded shadow-lg w-full max-w-xl"
      />
    </div>
  );
}
