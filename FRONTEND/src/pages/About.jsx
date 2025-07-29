import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-20 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">About Us</h1>
        <p className="text-lg mb-6 leading-7">
          At <span className="font-semibold text-blue-600">Helping Hands Foundation</span>, we believe in the power of kindness and action. Founded in 2022, our NGO has been dedicated to uplifting marginalized communities through transparency, compassion, and collaboration.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Mission</h2>
            <p className="leading-7">
              Our mission is to empower underprivileged individuals by supporting education, animal protection, child welfare, and anti-drug campaigns. We bridge the gap between generous donors and those in need, ensuring every rupee is used for meaningful impact.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Vision</h2>
            <p className="leading-7">
              We envision a world where everyone has access to basic needs, equal opportunities, and a life of dignity. Through technology and teamwork, we strive to become a transparent, people-first NGO where every voice matters.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">What We Do</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>🎓 Provide school supplies and scholarships to rural children.</li>
            <li>🐶 Rescue and rehabilitate abandoned or injured animals.</li>
            <li>👶 Organize child nutrition camps and awareness drives.</li>
            <li>🚭 Run anti-drug workshops for youth in vulnerable communities.</li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Join Us</h2>
          <p className="leading-7">
            Whether you want to volunteer, donate, or collaborate — we’d love to have you. Together, let’s make change possible. 🌍
          </p>
        </div>

        <div className="mt-16 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Helping Hands Foundation. All rights reserved.
        </div>
      </div>
    </div>
  );
}
