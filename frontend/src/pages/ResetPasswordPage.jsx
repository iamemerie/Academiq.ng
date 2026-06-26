import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── Inline Toast ─────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold mb-6 ${
        type === "error"
          ? "bg-rose-50 border-rose-200 text-rose-700"
          : "bg-emerald-50 border-emerald-200 text-emerald-700"
      }`}
    >
      <span>{type === "error" ? "❌" : "✅"}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="opacity-40 hover:opacity-100 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      showToast("Passwords do not match. Please check and try again.", "error");
      return;
    }

    if (password.length < 8) {
      showToast("Password must be at least 8 characters.", "error");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        token,
        password,
      });
      setDone(true);
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          "Failed to reset password. The link may have expired.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center py-8 px-4 antialiased">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(79,70,229,0.2)] mx-auto mb-3 cursor-pointer hover:rotate-6 transition duration-300"
            onClick={() => navigate("/")}
          >
            A
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Set a new password
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Choose a strong password you haven't used before
          </p>
        </div>

        {/* Toast */}
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />

        {done ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-base font-black text-slate-800 mb-1">
              Password updated!
            </p>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Your password has been reset successfully. You can now log in with
              your new password.
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
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password (min 8 characters)"
                className="w-full border border-slate-200 rounded-xl pl-4 pr-16 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
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

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                className={`w-full border rounded-xl pl-4 pr-4 py-3 text-sm bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 transition ${
                  confirm && password !== confirm
                    ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400"
                    : "border-slate-200 focus:ring-indigo-600/20 focus:border-indigo-600"
                }`}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
              />
              {/* Live match indicator */}
              {confirm && (
                <span className="absolute right-3.5 top-3.5 text-xs font-bold">
                  {password === confirm ? (
                    <span className="text-emerald-500">✓</span>
                  ) : (
                    <span className="text-rose-400">✗</span>
                  )}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-indigo-700 transition shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>

            <p className="text-center text-xs font-semibold text-slate-400 tracking-tight mt-2">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:text-indigo-800 transition"
              >
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
