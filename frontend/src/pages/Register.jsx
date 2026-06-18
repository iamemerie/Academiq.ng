import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "", // Added to track state safely
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRole = (selectedRole) => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
  };

  // Upgraded Validation & Submit Routine
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select your account type (Student or Tutor) to proceed.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Your passwords do not match. Please verify them.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      );

      alert(response.data.message || "Registration completed successfully!");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!formData.role) {
      alert(
        "Please select your account type (Student or Tutor) before signing up with Google.",
      );
      return;
    }

    try {
      const token = credentialResponse.credential;
      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        { token, role: formData.role }, // Sending role to backend for custom onboarding logic
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("role", response.data.role);

      alert(`Welcome ${response.data.fullName}! Authentication successful.`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Auth Error:", error);
      alert(error.response?.data?.message || "Google Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center py-16 px-4 antialiased">
      <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] w-full max-w-md transition-all">
        {/* BRAND IDENTITY HEADER */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(79,70,229,0.2)] mx-auto mb-3">
            A
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Create your account
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Join Academicaids.ng to streamline your learning tasks
          </p>
        </div>

        {/* STEP 1: EXPLICIT ROLE SELECTION PILLS */}
        <div className="space-y-2 mb-5">
          <label className="text-xs font-bold text-slate-500 tracking-wide uppercase">
            I want to join as a:
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleRole("student")}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs tracking-wide border-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                formData.role === "student"
                  ? "border-indigo-600 bg-indigo-50/50 text-indigo-600 shadow-sm"
                  : "border-slate-100 bg-slate-50/40 text-slate-500 hover:border-slate-200"
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleRole("tutor")}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs tracking-wide border-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                formData.role === "tutor"
                  ? "border-indigo-600 bg-indigo-50/50 text-indigo-600 shadow-sm"
                  : "border-slate-100 bg-slate-50/40 text-slate-500 hover:border-slate-200"
              }`}
            >
              👨‍🏫 Tutor
            </button>
          </div>
        </div>

        {/* MAIN REGISTRATION FORM ROUTE */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD FIELD WITH INTEGRATED INTERACTIVE TOGGLE */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="space-y-1">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 transition shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* VISUAL SEPARATION TRACK LAYER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase">
            or
          </span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        {/* GOOGLE FEDERATION BUTTON WRAPPER CONTAINER */}
        <div className="w-full flex justify-center [&>div]:w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Sign Up Blocked or Failed")}
            text="signup_with"
            shape="rectangular"
            theme="outline"
            width="100%"
          />
        </div>

        {/* FOOTER DIRECT NAVIGATION INQUIRY ROW */}
        <p className="mt-8 text-center text-xs font-semibold text-slate-400 tracking-tight">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-bold hover:text-indigo-800 transition pl-0.5"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
