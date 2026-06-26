import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      alert(response.data.message || "Registration completed successfully!");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("✅ Register Google button clicked!");
    console.log("  Form role selected:", formData.role);
    console.log("  credentialResponse:", credentialResponse);
    console.log("  Token exists:", !!credentialResponse.credential);

    if (!formData.role) {
      alert(
        "Please select your account type (Student or Tutor) before signing up with Google."
      );
      return;
    }

    try {
      const token = credentialResponse.credential;
      const response = await axios.post(`${API_BASE_URL}/api/auth/google`, {
        token,
        role: formData.role,
      });

      console.log("✅ Register backend response:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("role", response.data.role);

      alert(`Welcome ${response.data.fullName}! Authentication successful.`);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Register Google Auth Error:", error);
      console.error("  Error response:", error.response);
      alert(error.response?.data?.message || "Google Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 antialiased">
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Column - Registration Form */}
        <div className="flex-1 flex items-center justify-center py-12 px-4 md:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] w-full max-w-md transition-all">
            {/* BRAND IDENTITY HEADER */}
            <div className="text-center mb-8">
              <div
                className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(79,70,229,0.2)] mx-auto mb-3 cursor-pointer"
                onClick={() => navigate("/")}
              >
                A
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                Create your account
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Join Academiq.ng to streamline your learning tasks
              </p>
            </div>

            {/* ROLE SELECTION */}
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

            {/* FORM */}
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
                className="bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 transition shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-100"></div>
              <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase">
                or
              </span>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>

            {/* GOOGLE BUTTON */}
            <div className="w-full flex justify-center items-center mt-4">
              <div
                style={{ colorScheme: "light" }}
                className="w-full flex justify-center"
              >
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Google Sign Up Blocked or Failed")}
                  auto_select={false}
                  useOneTap={false}
                  text="signup_with"
                  shape="rectangular"
                  theme="outline"
                  size="medium"
                  width="100%"
                />
              </div>
            </div>

            {/* ✅ FIXED: was <a href>, now <Link to> */}
            <p className="mt-8 text-center text-xs font-semibold text-slate-400 tracking-tight">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:text-indigo-800 transition pl-0.5"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column - AcademiQ AI Write-up */}
        <div className="flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 flex items-center justify-center p-8 md:p-12">
          <div className="max-w-lg text-white">
            <div className="mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mb-6">
                🤖
              </div>
              <h2 className="text-4xl font-black mb-4">AcademiQ AI</h2>
              <p className="text-lg text-indigo-100 mb-8">
                Your intelligent learning companion
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  ✨
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Smart Learning Assistance
                  </h3>
                  <p className="text-indigo-100 text-sm">
                    Get instant help with assignments, explanations, and study
                    materials powered by advanced AI.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  📚
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Personalized Tutoring
                  </h3>
                  <p className="text-indigo-100 text-sm">
                    Connect with qualified tutors tailored to your learning
                    style and academic needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  🚀
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Accelerated Progress
                  </h3>
                  <p className="text-indigo-100 text-sm">
                    Track your learning journey with intelligent insights and
                    progress monitoring.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  🌐
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">24/7 Availability</h3>
                  <p className="text-indigo-100 text-sm">
                    Access learning resources and support anytime, anywhere.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/20">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-sm font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold">Join 10,000+ learners</p>
                  <p className="text-indigo-100 text-xs">
                    Already using AcademiQ to excel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
