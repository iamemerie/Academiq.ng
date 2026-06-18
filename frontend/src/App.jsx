import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import BrowseTutors from "./pages/BrowseTutor";
import BrowseRequests from "./pages/BrowseRequests";
import MyBookings from "./pages/MyBookings";
import SessionManager from "./pages/SessionManager";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browse-tutors"
        element={
          <ProtectedRoute>
            <BrowseTutors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browse-requests"
        element={
          <ProtectedRoute>
            <BrowseRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-sessions"
        element={
          <ProtectedRoute>
            <SessionManager />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
