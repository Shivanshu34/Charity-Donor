import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Navbar2 from "./components/Navbar2.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import RouteWrapper from "./pages/RouteWrapper.jsx";

import Home from "./pages/Home.jsx";
import Home2 from "./pages/Home2.jsx";
import Donate from "./pages/Donate.jsx";
import Login from "./pages/Login.jsx"; 
import Signup from "./pages/Signup.jsx";
import Contact from "./pages/Contact.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";
import AdminHome from "./pages/AdminHome.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminAllDonations from "./pages/AdminAllDonations.jsx";
import AdminTodaysDonations from "./pages/AdminTodaysDonations.jsx";
import UserDashboardLayout from "./pages/UserDashboardLayout.jsx";
import AllDonations from "./pages/AllDonations.jsx";
import TodaysDonations from "./pages/TodaysDonations.jsx";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.currentAdmin);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {isAdminRoute ? <Navbar2 /> : <Navbar />}
      <div className="min-h-screen px-4 py-6">
        <Routes>
          {/* Public routes (no sidebar) */}
          <Route path="/dashboard" element={<Home2 />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/about" element={<About />} />

          {/* Home route: sidebar only if user is logged in */}
          {user ? (
            <Route element={<UserDashboardLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/my-donations" element={<AllDonations />} />
              <Route path="/todays-donations" element={<TodaysDonations />} />
            </Route>
          ) : (
            <Route path="/" element={<Home />} />
          )}

          {/* Admin login/signup (outside layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />

          <Route element={<RouteWrapper requireAuth={true} isAdmin={true} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />      
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/all-donations" element={<AdminAllDonations />} />
            <Route path="/admin/today-donations" element={<AdminTodaysDonations />} />
          </Route>

          {/* Fallback for unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer /> 
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
