import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showRolePicker, setShowRolePicker] = useState(false);
  const [googlePending, setGooglePending] = useState(null);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        loginData,
      );
      const { token, role, fullName } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("fullName", fullName);

      if (role === "admin") {
        navigate("/admin/control-panel");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/google`, {
        token: credentialResponse.credential,
      });

      if (response.data.needsRole) {
        setGooglePending({
          name: response.data.name,
          email: response.data.email,
          token: credentialResponse.credential,
        });
        setShowRolePicker(true);
        return;
      }

      const { token, role, fullName } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("fullName", fullName);

      if (role === "admin") {
        navigate("/admin/control-panel");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Google authentication failed");
    }
  };

  // ✅ FIXED: was axiosInstance, now axios
  const handleRoleSelect = async (selectedRole) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/google`, {
        token: googlePending.token,
        role: selectedRole,
      });

      const { token, role, fullName } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("fullName", fullName);

      navigate("/dashboard");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center py-16 px-4 antialiased">
      {showRolePicker && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
            <div className="text-center mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl mx-auto mb-3">
                A
              </div>
              <h2 className="text-xl font-black text-slate-800">
                Welcome, {googlePending?.name}! 👋
              </h2>
              <p className="text-slate-400 text-xs font-medium mt-1">
                How will you be using Academiq.ng?
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleRoleSelect("student")}
                className="w-full py-4 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 font-bold text-sm text-slate-600 hover:text-indigo-600 transition-all"
              >
                🎓 I'm a Student
              </button>
              <button
                onClick={() => handleRoleSelect("tutor")}
                className="w-full py-4 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 font-bold text-sm text-slate-600 hover:text-indigo-600 transition-all"
              >
                👨‍🏫 I'm a Tutor
              </button>
            </div>

            <button
              onClick={() => setShowRolePicker(false)}
              className="w-full mt-4 text-xs text-slate-400 hover:text-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] w-full max-w-md">
        {/* BRAND LOGO */}
        <div className="text-center mb-8">
          <div
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(79,70,229,0.2)] mx-auto mb-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            A
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Log in to manage your active tutoring modules
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="email address"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              className="w-full border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-bold transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 transition shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-semibold text-slate-400 tracking-tight">
          Forgot password?{" "}
          <Link
            to="/forgot-password"
            className="text-indigo-600 font-bold hover:text-indigo-800 transition pl-0.5"
          >
            Reset it here
          </Link>
        </p>

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
              onError={() => console.log("Login Failed")}
              auto_select={false}
              useOneTap={false}
              text="signin_with"
              shape="rectangular"
              theme="outline"
              size="medium"
              width="100%"
            />
          </div>
        </div>

        {/* ✅ FIXED: was <a href>, now <Link to> */}
        <p className="mt-8 text-center text-xs font-semibold text-slate-400 tracking-tight">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-bold hover:text-indigo-800 transition pl-0.5"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
