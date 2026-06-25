import { useState, useEffect } from "react";
import PostRequestModal from "../components/PostRequestModal";
import Navbar from "../components/Navbar";
import SessionManager from "./SessionManager";
import { Link } from "react-router-dom";
import axios from "axios";

// Automatically swaps between your live Render URL on Netlify and localhost on your computer
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // NEW STATE: Tracks whether to show 'main' grid overview or the 'sessions' view
  const [view, setView] = useState("main");

  const fullName = localStorage.getItem("fullName");
  const role = localStorage.getItem("role");

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/api/requests/my-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // Dummy placeholder function to prevent compilation crashes on click event
  const handleDeleteRequest = (id) => {
    console.log("Delete request triggered for ID:", id);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Global project branding typography rule
  const fontStyle = {
    fontFamily: "'Space Grotesk', 'Poppins', 'Inter', sans-serif",
  };

  return (
    <div className="min-h-screen bg-slate-50/50 antialiased" style={fontStyle}>
      {/* Navbar */}
      <Navbar />

      {/* Main Container Wrapper */}
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation when viewing Sessions */}
        {view === "sessions" && (
          <button
            onClick={() => setView("main")}
            className="mb-6 text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition cursor-pointer"
            style={fontStyle}
          >
            ← Back to Dashboard Overview
          </button>
        )}

        {/* VIEW 1: DASHBOARD MAIN CARD GRID OVERVIEW */}
        {view === "main" && (
          <>
            <div className="text-left mb-10">
              <h1
                className="text-3xl font-black text-slate-800 tracking-tight"
                style={fontStyle}
              >
                Welcome back, {fullName}! 👋
              </h1>
              <p className="text-slate-400 text-sm font-medium mt-1">
                You are logged in as a{" "}
                <span className="font-bold text-indigo-600">
                  {role === "student" ? "🎓 Student" : "👨‍🏫 Tutor"}
                </span>
              </p>
            </div>

            {/* Quick Actions Grid Layout */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {role === "student" ? (
                <>
                  {/* Card 1: Post a Request */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-8 w-64 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-indigo-50/60 rounded-xl flex items-center justify-center text-xl mx-auto mb-4 text-indigo-600 group-hover:scale-110 transition duration-300">
                      ✨
                    </div>
                    <h3 className="font-bold text-slate-800 text-base tracking-tight mb-2">
                      Post a Request
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6 px-2">
                      Need expert guidance? Broadcast your project requirements
                      instantly.
                    </p>
                    <button
                      onClick={openModal}
                      className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 shadow-sm hover:shadow-md transition cursor-pointer"
                      style={fontStyle}
                    >
                      Post Now
                    </button>
                  </div>

                  {/* Card 2: Explore Tutors */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-8 w-64 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-indigo-50/60 text-indigo-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-4 group-hover:scale-110 transition duration-300">
                      🔍
                    </div>
                    <h3 className="font-bold text-slate-800 text-base tracking-tight mb-2">
                      Explore Tutors
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6 px-1">
                      Find the perfect verified tutor matching your exact
                      academic needs here.
                    </p>
                    <a
                      href="/browse-tutors"
                      className="block w-full bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-bold tracking-wide text-center hover:bg-indigo-700 shadow-sm hover:shadow-md transition"
                      style={fontStyle}
                    >
                      Browse
                    </a>
                  </div>

                  {/* Card 3: My Sessions */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-8 w-64 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-violet-50/60 text-violet-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-4 group-hover:scale-110 transition duration-300">
                      📅
                    </div>
                    <h3 className="font-bold text-slate-800 text-base tracking-tight mb-2">
                      My Sessions
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6 px-1">
                      Track commitments, handle scheduling details, and join
                      active classes.
                    </p>
                    <button
                      onClick={() => setView("sessions")}
                      className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 shadow-sm hover:shadow-md transition cursor-pointer"
                      style={fontStyle}
                    >
                      View Sessions
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Tutor Card 1: Explore Requests */}
                  <Link
                    to="/browse-requests"
                    className="bg-white border border-slate-100 rounded-2xl p-6 w-64 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300 group block select-none"
                  >
                    <div className="w-12 h-12 bg-violet-50/60 text-violet-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-4 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition duration-300">
                      🔍
                    </div>
                    <h3 className="font-black text-slate-800 text-base tracking-tight mb-1.5 group-hover:text-violet-600 transition duration-200">
                      Explore Requests
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-5 px-1">
                      Discover active student listings, project briefs, and
                      tasks matching your mastery.
                    </p>
                    <div
                      className="bg-slate-50 text-slate-600 group-hover:bg-violet-600 group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(124,58,237,0.2)] py-2.5 rounded-xl text-xs font-bold tracking-wide w-full transition-all duration-300 block"
                      style={fontStyle}
                    >
                      Discover
                    </div>
                  </Link>

                  {/* Tutor Card 2: My Sessions Manager Switcher */}
                  <div
                    onClick={() => setView("sessions")}
                    className="bg-white border border-slate-100 rounded-2xl p-6 w-64 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-indigo-50/60 text-indigo-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                      📅
                    </div>
                    <h3 className="font-black text-slate-800 text-base tracking-tight mb-1.5 group-hover:text-indigo-600 transition duration-200">
                      My Sessions
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-5 px-1">
                      View, track, and manage your active live learning sessions
                      and timeline milestones.
                    </p>
                    <button
                      type="button"
                      className="bg-slate-50 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide w-full transition-all duration-300 pointer-events-none"
                      style={fontStyle}
                    >
                      Open Manager
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Requests Section — Differentiates layout based on user types */}
            <div className="mt-16 w-full">
              {role === "student" ? (
                /* HIGHLY POLISHED CENTERED STUDENT ENGINE DISPLAY */
                <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
                  <div className="flex flex-col items-center text-center mb-8 w-full">
                    <div className="text-3xl mb-3 animate-bounce duration-1000">
                      📝
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                      My Requests
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                      Track, update, and manage your active learning broadcast
                      inquiries.
                    </p>

                    {requests.length > 0 && (
                      <span className="mt-3 bg-indigo-50 text-indigo-600 border border-indigo-100/50 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                        {requests.length}{" "}
                        {requests.length === 1 ? "Request" : "Total Requests"}
                      </span>
                    )}
                  </div>

                  <div className="w-full flex justify-center">
                    {requests.length === 0 ? (
                      <div className="w-full max-w-md text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl text-slate-400 mb-3 border border-slate-100/60">
                          📁
                        </div>
                        <h4 className="text-sm font-bold text-slate-700 tracking-tight">
                          No broadcasts active
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 max-w-[240px] leading-relaxed">
                          You haven't posted any learning requests yet. Tap your
                          workspace panel to launch one.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center justify-center w-full max-w-3xl">
                        {requests.map((request) => (
                          <div
                            key={request._id}
                            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-left w-full max-w-sm"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <span className="bg-indigo-50/80 text-indigo-600 text-[10px] font-black tracking-wide uppercase px-2.5 py-1 rounded-md border border-indigo-100/40">
                                  📚 {request.subject}
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50/60 font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                  Open
                                </span>
                              </div>

                              <h3 className="font-black text-slate-800 text-sm tracking-tight mb-1.5 group-hover:text-indigo-600 transition duration-200">
                                {request.title}
                              </h3>
                              <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">
                                {request.description}
                              </p>
                            </div>

                            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                              <span>📊 {request.level} Level</span>
                              <span className="bg-slate-50 px-2 py-1 rounded-md text-slate-500 normal-case">
                                ⏰{" "}
                                {new Date(request.deadline).toLocaleDateString(
                                  undefined,
                                  { month: "short", day: "numeric" },
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* TUTOR LIST OVERVIEW CONTAINER BLOCK */
                <div className="max-w-4xl mx-auto">
                  <div className="text-left mb-6">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                      Available Requests Queue
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Review live task applications looking for answers.
                    </p>
                  </div>

                  {requests.length === 0 ? (
                    <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl p-6">
                      <div className="text-3xl mb-2">📁</div>
                      <p className="text-slate-400 text-sm font-medium">
                        No client briefs assigned to your feed.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {requests.map((request) => {
                        const getStatusStyles = (status) => {
                          switch (status?.toLowerCase()) {
                            case "pending":
                              return "bg-amber-50 text-amber-600 border border-amber-100";
                            case "active":
                            case "approved":
                              return "bg-emerald-50 text-emerald-600 border border-emerald-100";
                            case "declined":
                            case "cancelled":
                              return "bg-rose-50 text-rose-600 border border-rose-100";
                            default:
                              return "bg-slate-50 text-slate-600 border border-slate-100";
                          }
                        };

                        return (
                          <div
                            key={request._id}
                            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:border-slate-200/80 transition duration-200 relative group text-left"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="space-y-1">
                                <h3 className="font-bold text-slate-800 text-base tracking-tight pr-8">
                                  {request.title}
                                </h3>

                                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
                                  <span>{request.subject}</span>
                                  <span className="text-slate-300">•</span>
                                  <span className="text-slate-500">
                                    {request.level} Level
                                  </span>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed pt-1 max-w-2xl">
                                  {request.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span
                                  className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md ${getStatusStyles(
                                    request.status,
                                  )}`}
                                >
                                  {request.status || "Open"}
                                </span>

                                <button
                                  onClick={() =>
                                    handleDeleteRequest(request._id)
                                  }
                                  className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition duration-200 cursor-pointer"
                                  title="Delete Request"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-50/80 flex items-center justify-between text-xs font-medium text-slate-400">
                              <div className="flex items-center gap-1.5">
                                <span>⏰</span>
                                <span>
                                  Deadline:{" "}
                                  <strong className="text-slate-600 font-semibold">
                                    {new Date(
                                      request.deadline,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </strong>
                                </span>
                              </div>

                              <button className="text-indigo-600 hover:text-indigo-800 font-bold transition cursor-pointer">
                                View Details →
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* VIEW 2: DYNAMIC INJECTION OF THE SESSION MANAGER SECTIONS */}
        {view === "sessions" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 animate-fadeIn">
            <SessionManager userRole={role} />
          </div>
        )}
      </div>

      {isModalOpen && (
        <PostRequestModal onClose={closeModal} onPostSuccess={fetchRequests} />
      )}
    </div>
  );
}

export default Dashboard;
