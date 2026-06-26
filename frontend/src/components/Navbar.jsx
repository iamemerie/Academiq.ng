import { useState } from "react";
import TutorProfileModal from "./TutorProfileModal";
import StudentProfileModal from "./StudentProfileModal";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const fullName = localStorage.getItem("fullName") || "User";
  const role = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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

  const getMobileLinkClass = (path) =>
    location.pathname === path
      ? "block px-4 py-3 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50"
      : "block px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.01)]">
        <div className="px-4 sm:px-8 lg:px-16 py-3.5 flex justify-between items-center max-w-7xl mx-auto">
          {/* BRAND LOGO */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 group select-none"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-base sm:text-lg shadow-[0_4px_12px_rgba(79,70,229,0.2)] group-hover:rotate-6 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              >
                <path d="M12 2L1 7l11 5 11-5-11-5z" />
                <path d="M21 11.5v5c0 .5-.5 1-1 1s-1-.5-1-1v-5" />
                <path d="M6 12v3.5c0 1.9 2.7 3.5 6 3.5s6-1.6 6-3.5V12" />
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
              Academ
              <span className="text-indigo-600 font-extrabold">IQ.ng</span>
            </h1>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/ai-assistant"
              className="group flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 font-medium transition"
            >
              <svg
                className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813zM19.071 4.929l-.707 1.95-1.95.707 1.95.707.707 1.95.707-1.95 1.95-.707-1.95-.707-.707-1.95z"
                />
              </svg>
              <span className="hidden lg:inline">Academiq AI</span>
            </Link>
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

          {/* DESKTOP RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Notification bell */}
            <button className="relative text-slate-400 hover:text-indigo-600 p-1.5 hover:bg-slate-50 rounded-xl transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

            {/* Profile */}
            <div
              className="flex items-center gap-2.5 border-l border-slate-100 pl-4 cursor-pointer group select-none"
              onClick={() => setShowProfileModal(true)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-black shadow-sm group-hover:shadow transition duration-200">
                {fullName?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden lg:block">
                <p className="font-bold text-slate-800 text-xs tracking-tight leading-none group-hover:text-indigo-600 transition">
                  {fullName}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {role === "student" ? "🎓 Student" : "👨‍🏫 Tutor"}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50/50 font-bold py-2 px-3 rounded-xl text-xs tracking-wide transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {/* MOBILE RIGHT SIDE */}
          <div className="flex md:hidden items-center gap-2">
            {/* Avatar */}
            <div
              className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-black shadow-sm cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            >
              {fullName?.charAt(0).toUpperCase()}
            </div>
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 transition"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 rounded-xl">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-black">
                {fullName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{fullName}</p>
                <p className="text-[11px] text-slate-400">
                  {role === "student" ? "🎓 Student" : "👨‍🏫 Tutor"}
                </p>
              </div>
            </div>

            <Link
              to="/dashboard"
              className={getMobileLinkClass("/dashboard")}
              onClick={() => setMobileMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link
              to="/ai-assistant"
              className={getMobileLinkClass("/ai-assistant")}
              onClick={() => setMobileMenuOpen(false)}
            >
              ✨ Academiq AI
            </Link>
            {role === "student" ? (
              <Link
                to="/browse-tutors"
                className={getMobileLinkClass("/browse-tutors")}
                onClick={() => setMobileMenuOpen(false)}
              >
                🔍 Explore Tutors
              </Link>
            ) : (
              <Link
                to="/browse-requests"
                className={getMobileLinkClass("/browse-requests")}
                onClick={() => setMobileMenuOpen(false)}
              >
                🔍 Discover Requests
              </Link>
            )}
            <Link
              to="/my-bookings"
              className={getMobileLinkClass("/my-bookings")}
              onClick={() => setMobileMenuOpen(false)}
            >
              📅 My Bookings
            </Link>

            <div className="pt-2 border-t border-slate-100 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* MODALS */}
      {showProfileModal && role === "tutor" && (
        <TutorProfileModal onClose={() => setShowProfileModal(false)} />
      )}
      {showProfileModal && role === "student" && (
        <StudentProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
}

export default Navbar;
