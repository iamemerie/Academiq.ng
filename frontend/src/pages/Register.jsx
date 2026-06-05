import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  // This function will handle changes to the form inputs. It updates the formData state with the new values.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // This function will handle role selection. It updates the formData state with the selected role.
  const handleRole = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  // Standard email/password form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  // Google Authentication success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      // Send the token payload to your custom Google route on the Express backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token,
        },
      );

      console.log("Google Auth Success Backend Response:", response.data);

      // Save the generated application JWT token to localStorage
      localStorage.setItem("token", response.data.token);

      alert(`Welcome ${response.data.fullName}! Authentication successful.`);

      // Optional: redirect to dashboard here if you are using react-router-dom
      // navigate("/dashboard");
    } catch (error) {
      console.error("Google Auth Error:", error);
      alert(error.response?.data?.message || "Google Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl text-indigo-600 font-bold text-center mb-6">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={handleChange}
            required
          />

          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => handleRole("student")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 ${
                formData.role === "student"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleRole("tutor")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 ${
                formData.role === "tutor"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              👨‍🏫 Tutor
            </button>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 mt-2"
          >
            Register
          </button>
        </form>

        {/* --- Visual Divider Section --- */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* --- Google Authentication Button Container --- */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Sign Up Blocked or Failed")}
            text="signup_with" // Dynamically changes layout text to "Sign up with Google"
            shape="rectangular"
            width="100%"
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
