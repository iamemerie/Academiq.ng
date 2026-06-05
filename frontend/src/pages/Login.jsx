import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send loginData to your backend API for authentication
    try {
      // Simulate API call
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData,
      );
      const { token, role, fullName } = response.data;
      // Store the token in localStorage or context for future authenticated requests
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("fullName", fullName);

      console.log("fullName saved: ", localStorage.getItem("fullName"));

      window.location.href = "/dashboard";

      //redirect based on role
      if (role === "student") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
      console.log(response.data);
      // Handle successful login (e.g., store token, redirect to dashboard, etc.)
    } catch (error) {
      alert(error.response.data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl text-indigo-600 font-bold text-center mb-6">
          Login to your account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="btn-primary bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
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
                window.location.href = "/dashboard";
              } catch (error) {
                alert("Google login failed");
              }
            }}
            onError={() => alert("Google login failed")}
          />

          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
            >
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
