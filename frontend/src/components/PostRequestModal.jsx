import React, { useState } from "react";
import axios from "axios";

// FIX 1: Destructure onPostSuccess from props
function PostRequestModal({ onClose, onPostSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    schoolType: "",
    level: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/requests", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Request posted successfully!");

      // FIX 2: Fire the dashboard's re-fetch state update before closing down
      if (onPostSuccess) {
        onPostSuccess();
      }

      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition";

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-8 pt-8 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Post a Request</h2>
            <p className="text-gray-400 text-sm mt-1">
              Describe the help you need
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-500 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">
          {/* Title */}
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

          {/* Subject */}
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

          {/* School Type */}
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
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  formData.schoolType === "university"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 text-gray-500"
                }`}
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
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  formData.schoolType === "secondary"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                🏫 Secondary
              </button>
            </div>
          </div>

          {/* Level and Deadline side by side */}
          <div className="flex gap-4">
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

          {/* Description */}
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

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Post Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostRequestModal;
