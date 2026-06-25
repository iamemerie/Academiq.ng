import React, { useState, useEffect } from "react";
import ReviewModal from "../components/ReviewModal";
import Navbar from "../components/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBookingForReview, setSelectedBookingForReview] =
    useState(null);

  // Read role safely from localStorage
  const userRole = localStorage.getItem("role") || "student";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_BASE_URL}/api/bookings/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          const errData = await response
            .json()
            .catch(() => ({ message: "Server error response" }));
          throw new Error(errData.message || "Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) throw new Error("Failed to update booking status");

      // Update local array state instantly
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b)),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500 font-medium">
        Loading your bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans selection:bg-indigo-100">
        <h2
          className="text-3xl font-bold tracking-tight text-gray-900 mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500 text-lg">No bookings found yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full ${
                        booking.status === "accepted"
                          ? "bg-emerald-50 text-emerald-700"
                          : booking.status === "declined"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {booking.request?.subject || "Academic Session"}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-semibold text-gray-800 mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {booking.request?.title || "Help Session"}
                  </h3>

                  <p className="text-sm text-gray-500 mb-6">
                    {userRole === "tutor"
                      ? `Student: ${booking.student?.fullName || "Anonymous student"}`
                      : `Helper: ${booking.tutor?.fullName || "Assigned Tutor"}`}
                  </p>
                </div>

                {/* Tutor Interaction Controls */}
                {userRole === "tutor" && booking.status === "pending" && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "accepted")
                      }
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-sm transition-colors duration-150"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "declined")
                      }
                      className="flex-1 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-600 font-medium text-sm py-2.5 px-4 border border-gray-200 hover:border-rose-200 rounded-xl transition-colors duration-150"
                    >
                      Decline
                    </button>
                  </div>
                )}

                {/* Student Interaction Controls */}
                {userRole === "student" && booking.status === "accepted" && (
                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/${booking.tutor?.phone || ""}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm py-2.5 px-4 rounded-xl transition-colors duration-150 shadow-sm"
                    >
                      Contact Helper via WhatsApp
                    </a>

                    <button
                      onClick={() => setSelectedBookingForReview(booking)}
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium text-xs py-2 px-4 rounded-xl transition-colors"
                    >
                      Leave a Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Review Modal Pop-up overlay layer */}
        {selectedBookingForReview && (
          <ReviewModal
            booking={selectedBookingForReview}
            onClose={() => setSelectedBookingForReview(null)}
            onReviewSubmitted={(bookingId) => {
              alert("Review saved successfully!");
            }}
          />
        )}
      </div>
    </>
  );
};

export default MyBookings;
