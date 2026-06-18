import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    tutorsRegistered: 0,
    studentsRegistered: 0,
    totalBookings: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Setup Axios Instance with Auth Headers
  const adminApi = axios.create({
    baseURL: "http://localhost:5000/api/admin",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Adjust these endpoints to match your server configuration paths
      const statsRes = await adminApi.get("/dashboard-stats");
      const usersRes = await adminApi.get("/users");

      setMetrics(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error fetching control panel logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle Action Button Click
  const handleToggleBan = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to change this user's platform access status?",
      )
    ) {
      try {
        setActionLoading(userId);
        const response = await adminApi.put(`/users/${userId}/toggle-ban`);

        // Optimistically update the UI list state
        setUsers(
          users.map((user) =>
            user._id === userId
              ? { ...user, isBanned: response.data.isBanned }
              : user,
          ),
        );

        // Refresh metrics counter arrays if needed
        const statsRes = await adminApi.get("/dashboard-stats");
        setMetrics(statsRes.data);
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to process administrative request",
        );
      } finally {
        setActionLoading(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/60 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500 tracking-wide">
            Syncing administrative logs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 antialiased py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* DASHBOARD TOP CONTROL BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              System Administration
            </h1>
            <p className="text-sm font-medium text-slate-400 mt-1">
              Real-time engine metrics and global user access verification hub.
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="self-start md:self-auto bg-white border border-slate-200 hover:border-slate-300 text-slate-600 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition shadow-sm flex items-center gap-2"
          >
            🔄 Refresh Core Data
          </button>
        </div>

        {/* METRIC CARD ANALYTICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Platform Users",
              value: metrics.totalUsers,
              color: "border-indigo-600",
              bg: "bg-indigo-50/30",
              icon: "👥",
            },
            {
              label: "Tutors Registered",
              value: metrics.tutorsRegistered,
              color: "border-emerald-500",
              bg: "bg-emerald-50/30",
              icon: "👨‍🏫",
            },
            {
              label: "Students Registered",
              value: metrics.studentsRegistered,
              color: "border-sky-500",
              bg: "bg-sky-50/30",
              icon: "🎓",
            },
            {
              label: "Total Session Bookings",
              value: metrics.totalBookings,
              color: "border-amber-500",
              bg: "bg-amber-50/30",
              icon: "📅",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`bg-white p-6 rounded-2xl border-l-4 ${card.color} border-y border-r border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between transition-transform duration-200 hover:-translate-y-0.5`}
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                  {card.label}
                </span>
                <p className="text-3xl font-black text-slate-900 tracking-tight">
                  {card.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center text-xl`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* DATA TABLE WRAPPER CONTAINER */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/40 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 tracking-tight">
              User Management Directory
            </h3>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">
              {users.length} Database Documents
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="p-4 text-xs font-bold text-slate-400 tracking-wider uppercase pl-6">
                    Profile Record
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-400 tracking-wider uppercase">
                    Contact Credentials
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-400 tracking-wider uppercase text-center">
                    System Clearance
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-400 tracking-wider uppercase text-right pr-6">
                    Access Control Panel
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => {
                  const currentRole = user.role?.toLowerCase();
                  const isSelf =
                    user.email?.toLowerCase() === "micheal@gmail.com";

                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-slate-50/30 transition-colors group"
                    >
                      {/* Column 1: Record Card */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white ${
                              currentRole === "admin"
                                ? "bg-purple-600 shadow-sm"
                                : currentRole === "tutor"
                                  ? "bg-emerald-500"
                                  : "bg-sky-500"
                            }`}
                          >
                            {user.fullName?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                              {user.fullName}
                            </p>
                            <p className="text-[11px] font-medium text-slate-400">
                              ID: {user._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Contact Info */}
                      <td className="p-4">
                        <span className="text-sm font-semibold text-slate-600">
                          {user.email}
                        </span>
                      </td>

                      {/* Column 3: Clearance Badge */}
                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide capitalize shadow-2xs ${
                            currentRole === "admin"
                              ? "bg-purple-50 text-purple-600 border border-purple-100"
                              : currentRole === "tutor"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-sky-50 text-sky-600 border border-sky-100"
                          }`}
                        >
                          {currentRole}
                        </span>
                      </td>

                      {/* Column 4: Functional Control Buttons */}
                      <td className="p-4 text-right pr-6">
                        {isSelf ? (
                          <span className="text-xs font-medium italic text-slate-300 pr-4">
                            Active Profile Session
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleBan(user._id)}
                            disabled={actionLoading === user._id}
                            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide border transition-all ${
                              user.isBanned
                                ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                                : "bg-white text-rose-600 border-rose-100 hover:bg-rose-50 hover:border-rose-200"
                            } disabled:opacity-50`}
                          >
                            {actionLoading === user._id
                              ? "Processing..."
                              : user.isBanned
                                ? "🔓 Restore Access"
                                : "🚫 Suspend Account"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
