import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Standard Login Request handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData,
      );

      const { token, role, fullName } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("fullName", fullName);

      // Clean, immediate client router switch without window reloads
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login connection failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Fed Identity Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential,
        },
      );

      const { token, role, fullName } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("fullName", fullName);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center py-16 px-4 antialiased">
      <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] w-full max-w-md">
        {/* BRAND LOGO HEADER COMPONENT */}
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

        {/* INTERACTIVE FORM FIELD LAYER */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-bold transition-colors select-none"
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

        {/* DECORATIVE BREAK SPLIT RULE */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase">
            or
          </span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        {/* GOOGLE OAUTH POPUP TRIGGER CONTAINER */}
        <div className="w-full flex justify-center [&>div]:w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Identity Verification Failed")}
            shape="rectangular"
            theme="outline"
            width="100%"
          />
        </div>

        {/* BOTTOM REDIRECT OPTIONS FOOTER */}
        <p className="mt-8 text-center text-xs font-semibold text-slate-400 tracking-tight">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-bold hover:text-indigo-800 transition pl-0.5"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
