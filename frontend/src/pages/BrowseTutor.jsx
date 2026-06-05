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

        // 1. Fetch all available tutors
        const tutorsResponse = await axios.get(
          "http://localhost:5000/api/auth/tutors",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTutors(tutorsResponse.data);

        // 2. Fetch using your exact working dashboard endpoint path
        const requestsResponse = await axios.get(
          "http://localhost:5000/api/requests/my-requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // Safely extract the array format matching your dashboard state
        const extracted = Array.isArray(requestsResponse.data)
          ? requestsResponse.data
          : requestsResponse.data.requests || [];

        setStudentRequests(extracted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-16 py-10">
        <h1 className="text-3xl font-bold text-gray-800">Browse Tutors</h1>
        <p className="text-gray-500 mt-2">
          Find the right tutor for your various needs
        </p>

        {/* Tutors Grid */}
        <div className="grid grid-cols-3 gap-6 mt-10">
          {loading ? (
            <p className="text-gray-400">Loading tutors...</p>
          ) : tutors.length === 0 ? (
            <p className="text-gray-400">No tutors available yet.</p>
          ) : (
            tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                    {tutor.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {tutor.fullName}
                    </h3>
                    <p className="text-gray-400 text-xs">👨‍🏫 Tutor</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-500 font-medium">
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    Online
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-4">
                  {tutor.bio || "No bio yet."}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.subjects?.length > 0 ? (
                    tutor.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No subjects listed
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedTutor(tutor)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
                >
                  Book Now
                </button>
              </div>
            ))
          )}

          {selectedTutor && (
            <BookingModal
              tutor={selectedTutor}
              initialRequests={studentRequests}
              onClose={() => setSelectedTutor(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseTutors;
