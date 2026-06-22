import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/reset-password`, { token, password });
      setDone(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center py-16 px-4 antialiased">
      <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(79,70,229,0.2)] mx-auto mb-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            A
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Set a new password
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Choose a strong password you haven't used before
          </p>
        </div>

        {done ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-700 mb-1">Password updated</p>
            <p className="text-xs text-slate-400 mb-6">
              Your password has been reset successfully.
            </p>
            <Link
              to="/login"
              className="inline-block w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 transition shadow-sm text-center"
            >
              Log in now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-bold transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 transition shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Reset Password"}
            </button>
            <p className="text-center text-xs font-semibold text-slate-400 tracking-tight mt-2">
              Remember your password?{" "}
              <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
