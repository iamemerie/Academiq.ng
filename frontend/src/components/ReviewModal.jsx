import React, { useState } from "react";

const ReviewModal = ({ booking, onClose, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: booking._id,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      onReviewSubmitted(booking._id);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 transition-all transform scale-100">
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3
              className="text-xl font-bold text-gray-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Rate your Session
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              How was your experience with{" "}
              {booking.tutor?.fullName || "your tutor"}?
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors"
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

        {/* Error Notification Alert */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Interactive Star Rating Picker */}
          <div className="flex flex-col items-center justify-center py-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Your Rating
            </label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-3xl transition-transform duration-100 hover:scale-120 focus:outline-none"
                >
                  <span
                    className={`transition-colors duration-700 ${
                      star <= (hoveredRating || rating)
                        ? "text-amber-400"
                        : "text-gray-200"
                    }`}
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text Input Field */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Review Details
            </label>
            <textarea
              required
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other students what you liked or how this session helped you..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-shadow duration-150"
            ></textarea>
          </div>

          {/* Modal Action Footer Layout */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-sm py-2.5 rounded-xl border border-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium text-sm py-2.5 rounded-xl shadow-sm transition-colors flex justify-center items-center"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
