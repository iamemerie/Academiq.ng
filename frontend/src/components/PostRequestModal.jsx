import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function PostRequestModal({ onClose, onPostSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    schoolType: "",
    level: "",
    deadline: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 4000);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/api/requests`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Request posted successfully!", "success");
      if (onPostSuccess) onPostSuccess();
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition";

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-end sm:items-center justify-center z-50 px-0 sm:px-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl sm:rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Post a Request
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Describe the help you need
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-500 text-3xl leading-none w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Toast */}
        {toast.message && (
          <div
            className={`mx-6 sm:mx-8 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-rose-50 border-rose-200 text-rose-700"
            }`}
          >
            <span>{toast.type === "success" ? "✅" : "❌"}</span>
            <span className="flex-1">{toast.message}</span>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 sm:px-8 py-5 sm:py-6 flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Need help with Calculus assignment"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="e.g. Mathematics, Biology, English"
              value={formData.subject}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              School Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    schoolType: "university",
                    level: "",
                  })
                }
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${formData.schoolType === "university" ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-200 text-gray-500"}`}
              >
                🎓 University
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    schoolType: "secondary",
                    level: "",
                  })
                }
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${formData.schoolType === "secondary" ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-200 text-gray-500"}`}
              >
                🏫 Secondary
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={!formData.schoolType}
              >
                <option value="">Select Level</option>
                {formData.schoolType === "university" && (
                  <>
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                    <option value="500">500 Level</option>
                    <option value="600">600 Level</option>
                    <option value="masters">Masters</option>
                  </>
                )}
                {formData.schoolType === "secondary" && (
                  <>
                    <option value="SS1">SS 1</option>
                    <option value="SS2">SS 2</option>
                    <option value="SS3">SS 3</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your problem in detail..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={inputClass}
              required
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting...
                </span>
              ) : (
                "Post Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostRequestModal;
