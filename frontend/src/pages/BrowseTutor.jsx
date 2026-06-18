import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookingModal from "../components/BookingModal";
import axios from "axios";

function BrowseTutors() {
  const [tutors, setTutors] = useState([]);
  const [studentRequests, setStudentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1. Fetch available tutors
        const tutorsResponse = await axios.get(
          "http://localhost:5000/api/auth/tutors",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTutors(tutorsResponse.data);

        // 2. Fetch student requests matching dashboard state
        const requestsResponse = await axios.get(
          "http://localhost:5000/api/requests/my-requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const extracted = Array.isArray(requestsResponse.data)
          ? requestsResponse.data
          : requestsResponse.data.requests || [];

        setStudentRequests(extracted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching view criteria:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Global component layout font configuration engine
  const fontStyle = { fontFamily: "'Space Grotesk', sans-serif" };

  return (
    <div className="min-h-screen bg-slate-50/50 antialiased" style={fontStyle}>
      <Navbar />

      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-7xl mx-auto">
        {/* HEADER BRAND BLOCK */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Browse Tutors
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Connect with subject matter experts customized to fit your tasks.
          </p>
        </div>

        {/* LOADING & EMPTY FEEDBACK STATES */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-xs font-bold tracking-wide uppercase">
              Assembling Tutors...
            </p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.01)] max-w-md mx-auto mt-12">
            <span className="text-2xl">👨‍🏫</span>
            <h3 className="text-base font-bold text-slate-800 tracking-tight mt-3">
              No Tutors Found
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Check back later or invite an educator to get started.
            </p>
          </div>
        ) : (
          /* RESPONSIVE TUTORS DISPLAY GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_-4px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* TUTOR PRIMARY ACCOUNT DATA CARD */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-black shadow-sm tracking-wide">
                      {tutor.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-0.5 text-left">
                      <h3 className="font-bold text-slate-800 text-sm tracking-tight group-hover:text-indigo-600 transition duration-200">
                        {tutor.fullName}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">
                        👨‍🏫 Verified Tutor
                      </p>
                    </div>

                    {/* STATUS PILL */}
                    <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50/60 font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Online
                    </span>
                  </div>

                  {/* ACCOUNT BIO ABSTRACT */}
                  <p className="text-slate-500 text-xs leading-relaxed mb-5 line-clamp-3 text-left">
                    {tutor.bio ||
                      "This educator hasn't customized their background brief description yet."}
                  </p>

                  {/* EXPERTISE SUBJECT BADGES ROW */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tutor.subjects?.length > 0 ? (
                      tutor.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="bg-indigo-50/50 text-indigo-600 text-[10px] font-bold tracking-tight px-2.5 py-1 rounded-md border border-indigo-100/30 capitalize"
                        >
                          {subject}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-300 text-[10px] font-medium italic">
                        No core topics specified
                      </span>
                    )}
                  </div>
                </div>

                {/* INTERACTIVE INITIATION BUTTON */}
                <button
                  type="button"
                  onClick={() => setSelectedTutor(tutor)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] transition duration-200 cursor-pointer"
                  style={fontStyle}
                >
                  Book Session
                </button>
              </div>
            ))}
          </div>
        )}

        {/* MODAL INJECTION INTERFACE ROUTE */}
        {selectedTutor && (
          <BookingModal
            tutor={selectedTutor}
            initialRequests={studentRequests}
            onClose={() => setSelectedTutor(null)}
          />
        )}
      </div>
    </div>
  );
}

export default BrowseTutors;
