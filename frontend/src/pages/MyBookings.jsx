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
  const [toast, setToast] = useState({ message: "", type: "" });

  const userRole = localStorage.getItem("role") || "student";

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 4000);
  };

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
            .catch(() => ({ message: "Server error" }));
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
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b)),
      );
      showToast(`Booking ${newStatus} successfully.`, "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-[50vh] gap-3">
          <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">
            Loading your bookings...
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="max-w-md mx-auto my-8 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-center text-sm font-semibold">
          ❌ {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-semibold max-w-sm ${
            toast.type === "success"
              ? "bg-white border-emerald-200 text-emerald-700"
              : "bg-white border-rose-200 text-rose-700"
          }`}
        >
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-sans">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            My Bookings
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}{" "}
            found
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-slate-700 font-bold text-base mb-1">
              No bookings yet
            </p>
            <p className="text-slate-400 text-sm">
              Your bookings will appear here once created.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
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
                    <span className="text-xs font-medium text-gray-400 truncate ml-2 max-w-[120px]">
                      {booking.request?.subject || "Academic Session"}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                    {booking.request?.title || "Help Session"}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {userRole === "tutor"
                      ? `Student: ${booking.student?.fullName || "Anonymous"}`
                      : `Helper: ${booking.tutor?.fullName || "Assigned Tutor"}`}
                  </p>
                </div>

                {/* Tutor Controls */}
                {userRole === "tutor" && booking.status === "pending" && (
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "accepted")
                      }
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-2.5 px-4 rounded-xl transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "declined")
                      }
                      className="flex-1 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-600 font-medium text-sm py-2.5 px-4 border border-gray-200 hover:border-rose-200 rounded-xl transition"
                    >
                      Decline
                    </button>
                  </div>
                )}

                {/* Student Controls */}
                {userRole === "student" && booking.status === "accepted" && (
                  <div className="mt-2 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/${booking.tutor?.phone || ""}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm py-2.5 px-4 rounded-xl transition shadow-sm"
                    >
                      💬 Contact via WhatsApp
                    </a>
                    <button
                      onClick={() => setSelectedBookingForReview(booking)}
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium text-xs py-2 px-4 rounded-xl transition"
                    >
                      ⭐ Leave a Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedBookingForReview && (
          <ReviewModal
            booking={selectedBookingForReview}
            onClose={() => setSelectedBookingForReview(null)}
            onReviewSubmitted={() => {
              showToast("Review saved successfully!", "success");
              setSelectedBookingForReview(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default MyBookings;
