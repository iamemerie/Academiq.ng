import React, { useState, useEffect } from "react";
import axios from "axios";

function TutorProfileModal({ tutor, onClose }) {
  const [formData, setFormData] = useState({
    bio: "",
    subjects: "",
  });

  // Manage availability as a structured array matching the Mongoose schema
  const [availabilitySlots, setAvailabilitySlots] = useState([
    { dayOfWeek: "Monday", startTime: "14:00", endTime: "16:00" },
  ]);

  // If editing an existing tutor profile, pre-fill form fields on mount
  useEffect(() => {
    if (tutor) {
      setFormData({
        bio: tutor.bio || "",
        subjects: tutor.subjects ? tutor.subjects.join(", ") : "",
      });
      if (tutor.availability && tutor.availability.length > 0) {
        setAvailabilitySlots(tutor.availability);
      }
    }
  }, [tutor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle updates to individual row options inside our availability array
  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...availabilitySlots];
    updatedSlots[index][field] = value;
    setAvailabilitySlots(updatedSlots);
  };

  // Add a clean template slot row to the state
  const addAvailabilitySlot = () => {
    setAvailabilitySlots([
      ...availabilitySlots,
      { dayOfWeek: "Monday", startTime: "09:00", endTime: "12:00" },
    ]);
  };

  // Remove a specific row slot from state
  const removeAvailabilitySlot = (indexToRemove) => {
    setAvailabilitySlots(
      availabilitySlots.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Availability slots are already structured as an array of objects!
      await axios.put(
        `${API_BASE_URL}/api/auth/update-profile`,
        {
          bio: formData.bio,
          subjects: formData.subjects
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          availability: availabilitySlots,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition";
  const slotInputClass =
    "border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition";

  const daysOfWeekOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-8 pt-8 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2
              className="text-xl font-bold text-gray-800"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Edit Profile
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Update your tutoring profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-500 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Form Body Container */}
        <form
          onSubmit={handleSubmit}
          className="px-8 py-6 flex flex-col gap-4 overflow-y-auto flex-grow"
        >
          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={inputClass}
              rows="3"
              placeholder="Tell students about yourself..."
              required
            ></textarea>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Subjects
            </label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Math, Physics, Chemistry"
              required
            />
            <p className="text-gray-400 text-xs mt-1">
              Separate subjects with commas
            </p>
          </div>

          {/* UPGRADED: Structured Availability Layout */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-600">
                Weekly Availability Windows
              </label>
              <button
                type="button"
                onClick={addAvailabilitySlot}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
              >
                + Add Slot
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {availabilitySlots.length === 0 ? (
                <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200 text-center">
                  No availability slots added yet. Click "+ Add Slot" above.
                </p>
              ) : (
                availabilitySlots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 relative group animate-fadeIn"
                  >
                    {/* Day Select dropdown */}
                    <select
                      value={slot.dayOfWeek}
                      onChange={(e) =>
                        handleSlotChange(index, "dayOfWeek", e.target.value)
                      }
                      className={`${slotInputClass} flex-grow`}
                    >
                      {daysOfWeekOptions.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>

                    {/* Start Time input */}
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        handleSlotChange(index, "startTime", e.target.value)
                      }
                      className={slotInputClass}
                      required
                    />

                    <span className="text-xs text-gray-400 font-medium">
                      to
                    </span>

                    {/* End Time input */}
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        handleSlotChange(index, "endTime", e.target.value)
                      }
                      className={slotInputClass}
                      required
                    />

                    {/* Row Delete button */}
                    <button
                      type="button"
                      onClick={() => removeAvailabilitySlot(index)}
                      className="text-gray-300 hover:text-rose-500 text-lg font-bold px-1 transition"
                      title="Remove slot"
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-auto flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TutorProfileModal;
