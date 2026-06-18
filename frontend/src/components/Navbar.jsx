import { useState } from "react";
import TutorProfileModal from "./TutorProfileModal";
import StudentProfileModal from "./StudentProfileModal";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const fullName = localStorage.getItem("fullName") || "User";
  const role = localStorage.getItem("role");
  const location = useLocation();

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getLinkClass = (path) => {
    const baseClass =
      "text-sm font-semibold tracking-tight transition-colors duration-200 py-1 relative ";
    const activeIndicator =
      "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full";

    return location.pathname === path
      ? `${baseClass} text-indigo-600 ${activeIndicator}`
      : `${baseClass} text-slate-500 hover:text-indigo-600`;
  };

  return (
    <>
      {" "}
      {/* ✨ FIX: Removed the <div className="w-full"> wrapper to unblock sticky behavior */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/80 px-8 lg:px-16 py-4 flex justify-between items-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.01)]">
        {/* BRAND LOGO AREA */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5 group select-none"
        >
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-[0_4px_12px_rgba(79,70,229,0.2)] group-hover:rotate-6 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-white"
            >
              <path d="M12 2L1 7l11 5 11-5-11-5z" />
              <path d="M21 11.5v5c0 .5-.5 1-1 1s-1-.5-1-1v-5" />
              <path d="M6 12v3.5c0 1.9 2.7 3.5 6 3.5s6-1.6 6-3.5V12" />
            </svg>
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">
            Academic
            <span className="text-indigo-600 font-extrabold">aids.ng</span>
          </h1>
        </Link>

        {/* INTERACTION LINKS & ACTIONS CONTROLLER CONTAINER */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className={getLinkClass("/dashboard")}>
              Home
            </Link>

            {role === "student" ? (
              <Link
                to="/browse-tutors"
                className={getLinkClass("/browse-tutors")}
              >
                Explore Tutors
              </Link>
            ) : (
              <Link
                to="/browse-requests"
                className={getLinkClass("/browse-requests")}
              >
                Discover Requests
              </Link>
            )}

            <Link to="/my-bookings" className={getLinkClass("/my-bookings")}>
              My Bookings
            </Link>
          </div>

          {/* NOTIFICATION INTERFACE BAR COMPONENT */}
          <button className="relative text-slate-400 hover:text-indigo-600 p-1.5 hover:bg-slate-50 rounded-xl transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5.5 w-5.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* USER INTERACTIVE PROFILE CARD BLOCK */}
          <div
            className="flex items-center gap-3 border-l border-slate-100 pl-6 cursor-pointer group select-none"
            onClick={() => setShowProfileModal(true)}
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-black tracking-wider shadow-sm group-hover:shadow transition duration-200">
              {fullName?.charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden sm:block">
              <p className="font-bold text-slate-800 text-xs tracking-tight leading-none group-hover:text-indigo-600 transition">
                {fullName}
              </p>
              <p className="text-[10px] text-slate-400 font-medium capitalize mt-1">
                {role === "student" ? "🎓 Student" : "👨‍🏫 Tutor"}
              </p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50/50 font-bold py-2 px-3.5 rounded-xl text-xs tracking-wide transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* POPUP MODALS INJECTION POINTS */}
      {showProfileModal && role === "tutor" && (
        <TutorProfileModal onClose={() => setShowProfileModal(false)} />
      )}
      {showProfileModal && role === "student" && (
        <StudentProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </> /* ✨ FIX: Matching Fragment closer tags */
  );
}

export default Navbar;
