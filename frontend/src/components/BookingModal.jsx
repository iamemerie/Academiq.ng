import React, { useState, useEffect } from "react";
import axios from "axios";

function BookingModal({ tutor, initialRequests = [], onClose }) {
  // Initialize state cleanly
  const [selectedRequest, setSelectedRequest] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // FIX: Watch initialRequests for updates. When the 4 requests arrive async,
  // this hook captures them and sets the active ID instantly.
  useEffect(() => {
    if (initialRequests.length > 0 && !selectedRequest) {
      setSelectedRequest(initialRequests[0]._id);
    }
  }, [initialRequests, selectedRequest]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRequest) {
      alert("Please select an academic help request first!");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          tutorId: tutor._id,
          requestId: selectedRequest,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Booking request sent successfully!");
      onClose();
    } catch (error) {
      console.error("Booking creation failed:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong creating your booking request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3
              className="text-xl font-bold text-gray-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Book a Tutor
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Booking{" "}
              <span className="font-semibold text-indigo-600">
                {tutor.fullName}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
          >
            <svg
              className="h-5 w-5"
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
          </button>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
              Select a Request
            </label>
            {initialRequests.length === 0 ? (
              <p className="text-sm text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100">
                You haven't posted any help requests yet. Create one on your
                dashboard first!
              </p>
            ) : (
              <select
                value={selectedRequest}
                onChange={(e) => setSelectedRequest(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-indigo-500"
              >
                {initialRequests.map((req) => (
                  <option key={req._id} value={req._id}>
                    {req.subject || "General"} —{" "}
                    {req.title || "Untitled Help Request"}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-sm py-2.5 rounded-xl border border-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || initialRequests.length === 0}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium text-sm py-2.5 rounded-xl shadow-sm transition-colors flex justify-center items-center"
            >
              {submitting ? "Sending..." : "Send Booking Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
