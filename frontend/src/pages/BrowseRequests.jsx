import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function BrowseRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/api/requests/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Global project branding typography rule
  const fontStyle = {
    fontFamily: "'Space Grotesk', 'Poppins', 'Inter', sans-serif",
  };

  return (
    <div className="min-h-screen bg-slate-50/50 antialiased" style={fontStyle}>
      <Navbar />

      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-7xl mx-auto">
        {/* SECTION HEADER TRACK */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Browse Requests
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Discover students seeking support and make an impact on their
            studies.
          </p>
        </div>

        {/* FEEDBACK STATUS CONTROLLERS */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-xs font-bold tracking-wide uppercase">
              Assembling Live Requests...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.01)] max-w-md mx-auto mt-12">
            <span className="text-2xl">📋</span>
            <h3 className="text-base font-bold text-slate-800 tracking-tight mt-3">
              No Active Requests
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Students haven't posted any assistance tickets yet.
            </p>
          </div>
        ) : (
          /* RESPONSIVE LAYOUT CARDS ENGINE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* TOP PANEL: STUDENT META ID */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-black shadow-sm tracking-wide shrink-0">
                      {request.student?.fullName?.charAt(0).toUpperCase()}
                    </div>

                    <div className="space-y-0.5 text-left overflow-hidden">
                      <h3 className="font-bold text-slate-800 text-sm tracking-tight truncate group-hover:text-indigo-600 transition duration-200">
                        {request.student?.fullName || "Anonymous Student"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>📚 {request.subject}</span>
                        {request.student?.school && (
                          <span className="truncate max-w-[120px]">
                            • 🏫 {request.student.school}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="ml-auto flex items-center gap-1.5 text-[10px] text-indigo-600 bg-indigo-50/70 font-bold px-2 py-0.5 rounded-md border border-indigo-100/30 shrink-0">
                      <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                      Active
                    </span>
                  </div>

                  {/* INTERACTIVE STUDENT BIO DESCRIPTOR INSIGHT */}
                  {request.student?.bio && (
                    <p className="text-[11px] leading-relaxed text-slate-400 bg-slate-50/50 border border-slate-100/60 p-2.5 rounded-xl mb-4 italic text-left">
                      "{request.student.bio}"
                    </p>
                  )}

                  {/* SEPARATOR BRIEF CONTENT PANEL */}
                  <div className="text-left mb-4">
                    <h4 className="font-bold text-slate-800 text-sm tracking-tight mb-1">
                      {request.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {request.description}
                    </p>
                  </div>
                </div>

                {/* BOTTOM METADATA BAR AND CTA BUTTON BUTTONS */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold bg-slate-50/40 border-t border-slate-100/80 pt-3.5 pb-4 mt-2">
                    <span className="flex items-center gap-1 text-slate-500">
                      📊 {request.level || request.student?.level || "N/A"}{" "}
                      Level
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/60">
                      ⏰{" "}
                      {new Date(request.deadline).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] transition duration-200 cursor-pointer"
                    style={fontStyle}
                  >
                    Respond to Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseRequests;
