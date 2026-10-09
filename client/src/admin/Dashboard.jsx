// src/admin/Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, Mail, CheckCircle, Trash2, LogOut, CalendarCheck, Shield, AlertCircle, RefreshCw } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const FALLBACK_DASHBOARD_EVENTS = [
  {
    _id: "demo-dash-1",
    eventName: "Apex Horizon Rally",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800",
    eventstartingDate: "2026-10-15",
    startTime: "10:00 AM",
    location: "Silverstone Circuit, UK",
    description: "High-octane tarmac and gravel stages featuring the finest vintage and modern rally cars.",
    organizerName: "Apex Racing Club",
    contactEmail: "apex@example.com",
    Permission: false,
  },
  {
    _id: "demo-dash-2",
    eventName: "Alpine Snow Drift",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    eventstartingDate: "2026-11-20",
    startTime: "06:00 PM",
    location: "Innsbruck, Austria",
    description: "Night ice trial pushing drivers and machines to the edge of grip and precision.",
    organizerName: "Alpine Motorsport",
    contactEmail: "alpine@example.com",
    Permission: true,
  },
];

// Change Password Component
const ChangePassword = ({ onUnauthorized }) => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (newPass.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    if (newPass !== confirm) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: current,
          newPassword: newPass,
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        onUnauthorized();
        return;
      }

      if (res.ok && data.success) {
        setMessage({ type: "success", text: data.message || "Password updated successfully!" });
        setCurrent("");
        setNewPass("");
        setConfirm("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update password." });
      }
    } catch (err) {
      console.error("Change password error:", err);
      setMessage({ type: "error", text: "Unable to reach server. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-[#00F9FF] flex items-center gap-2">
        <KeyRound size={22} /> Change Admin Password
      </h2>

      {message && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-900/40 text-green-200 border border-green-500"
              : "bg-red-900/40 text-red-200 border border-red-500"
          }`}
        >
          {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1">Current Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1">New Password (min 6 chars)</label>
          <input
            type="password"
            placeholder="••••••••"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1">Confirm New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg bg-[#00F9FF] hover:bg-cyan-400 text-black font-bold transition shadow-[0_0_12px_rgba(0,249,255,0.3)] cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

// Messages Page (Connected to MongoDB messages)
const Messages = ({ onUnauthorized }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/mail/messages`, {
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        onUnauthorized();
        return;
      }

      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.warn("Could not fetch messages:", err.message);
      setError("Unable to load messages from server.");
    } finally {
      setLoading(false);
    }
  }, [onUnauthorized]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="text-[#00F9FF]" size={22} /> Inbox & Contact Queries
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Real inquiries submitted through the contact form, securely saved in MongoDB.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-1.5 text-xs text-[#00F9FF] hover:text-cyan-300 p-2 rounded-lg border border-[#00F9FF]/30 hover:bg-[#00F9FF]/10 transition"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading inquiries...</div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-900/30 border border-red-500 text-red-200 text-sm">
          {error}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-black/30 rounded-2xl border border-white/10">
          No contact inquiries recorded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 p-5 hover:border-white/20 transition space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div>
                  <h3 className="font-bold text-white text-lg">{msg.subject}</h3>
                  <p className="text-xs text-[#00F9FF]">
                    From: <span className="font-semibold">{msg.name}</span> ({msg.email})
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed pt-1">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Event Permissions Page
const EventPermissions = ({ events, togglePermission, deleteEvent, actionMessage }) => (
  <div className="max-w-4xl mx-auto space-y-6">
    <div className="flex items-center justify-between pb-2 border-b border-white/10">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="text-[#00F9FF]" size={24} /> Event Moderation & Permissions
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Review, approve, or remove user-submitted motorsport events
        </p>
      </div>
      <span className="text-xs bg-[#00F9FF]/20 text-[#00F9FF] px-3 py-1 rounded-full font-semibold border border-[#00F9FF]/30">
        {events.length} Total Events
      </span>
    </div>

    {actionMessage && (
      <div
        className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
          actionMessage.type === "success"
            ? "bg-green-900/40 text-green-200 border border-green-500"
            : "bg-red-900/40 text-red-200 border border-red-500"
        }`}
      >
        {actionMessage.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
        <span>{actionMessage.text}</span>
      </div>
    )}

    {events.length === 0 ? (
      <div className="text-center py-12 text-gray-400 bg-black/30 rounded-2xl border border-white/10">
        No events currently in the system.
      </div>
    ) : (
      <div className="grid gap-6">
        {events.map((event) => {
          const startDate = new Date(event.eventstartingDate);
          const dateStr = !isNaN(startDate.getTime())
            ? `${startDate.getDate()} ${startDate.toLocaleString("default", { month: "short" })} ${startDate.getFullYear()}`
            : event.eventstartingDate;

          return (
            <div
              key={event._id}
              className="bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-white/20 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={event.imageUrl || "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800"}
                  alt={event.eventName}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{event.eventName}</h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        event.Permission
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {event.Permission ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {dateStr} • {event.location || "TBD"}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Organizer: <span className="text-white">{event.organizerName || "Anonymous"}</span> ({event.contactEmail || "N/A"})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => togglePermission(event._id, !event.Permission)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    event.Permission
                      ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border border-yellow-500/30"
                      : "bg-[#00F9FF] text-black hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,249,255,0.3)]"
                  }`}
                >
                  <CheckCircle size={16} />
                  {event.Permission ? "Revoke Approval" : "Approve Event"}
                </button>

                <button
                  onClick={() => deleteEvent(event._id)}
                  className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition cursor-pointer"
                  title="Delete Event"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("permissions");
  const [events, setEvents] = useState(FALLBACK_DASHBOARD_EVENTS);
  const [actionMessage, setActionMessage] = useState(null);

  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }, [navigate]);

  // Fetch events with auth headers
  useEffect(() => {
    fetch(`${API_URL}/getEvent`, {
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (res.status === 401) {
          handleUnauthorized();
          return null;
        }
        if (!res.ok) throw new Error("Could not fetch events");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch((err) => {
        console.warn("Backend not available, using dashboard fallback data:", err.message);
      });
  }, [handleUnauthorized]);

  // Update permission with real JWT token
  const togglePermission = async (eventId, newPermissionState) => {
    setActionMessage(null);
    try {
      const res = await fetch(`${API_URL}/events/${eventId}/permission`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ Permission: newPermissionState }),
      });

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setEvents((prev) =>
          prev.map((ev) =>
            ev._id === eventId ? { ...ev, Permission: newPermissionState } : ev
          )
        );
        setActionMessage({
          type: "success",
          text: `Event ${newPermissionState ? "approved" : "revoked"} successfully.`,
        });
      } else {
        setActionMessage({
          type: "error",
          text: data.error || "Failed to update event permission.",
        });
      }
    } catch (err) {
      console.error("Toggle permission error:", err);
      setActionMessage({
        type: "error",
        text: "Network error. Permission was not updated on the server.",
      });
    }
  };

  // Delete event with real JWT token
  const deleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to permanently delete this event?")) return;
    setActionMessage(null);

    try {
      const res = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setEvents((prev) => prev.filter((ev) => ev._id !== eventId));
        setActionMessage({
          type: "success",
          text: "Event deleted successfully.",
        });
      } else {
        setActionMessage({
          type: "error",
          text: data.error || "Failed to delete event.",
        });
      }
    } catch (err) {
      console.error("Delete event error:", err);
      setActionMessage({
        type: "error",
        text: "Network error. Event was not deleted on the server.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activePage) {
      case "permissions":
        return (
          <EventPermissions
            events={events}
            togglePermission={togglePermission}
            deleteEvent={deleteEvent}
            actionMessage={actionMessage}
          />
        );
      case "password":
        return <ChangePassword onUnauthorized={handleUnauthorized} />;
      case "messages":
        return <Messages onUnauthorized={handleUnauthorized} />;
      default:
        return (
          <EventPermissions
            events={events}
            togglePermission={togglePermission}
            deleteEvent={deleteEvent}
            actionMessage={actionMessage}
          />
        );
    }
  };

  const userEmail = localStorage.getItem("userEmail") || "admin@carsreally.com";

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-r from-black to-blue-950 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black/60 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-extrabold text-[#00F9FF]">CarsReally</h1>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-gray-300">ADMIN</span>
          </div>
          <p className="text-xs text-gray-400 mb-6 truncate" title={userEmail}>
            Logged in as: <span className="text-white">{userEmail}</span>
          </p>

          <nav className="space-y-2">
            <button
              onClick={() => setActivePage("permissions")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition cursor-pointer text-left ${
                activePage === "permissions"
                  ? "bg-[#00F9FF] text-black font-bold shadow-[0_0_10px_rgba(0,249,255,0.3)]"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <CalendarCheck size={18} /> Event Approvals
            </button>

            <button
              onClick={() => setActivePage("messages")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition cursor-pointer text-left ${
                activePage === "messages"
                  ? "bg-[#00F9FF] text-black font-bold shadow-[0_0_10px_rgba(0,249,255,0.3)]"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Mail size={18} /> Messages
            </button>

            <button
              onClick={() => setActivePage("password")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition cursor-pointer text-left ${
                activePage === "password"
                  ? "bg-[#00F9FF] text-black font-bold shadow-[0_0_10px_rgba(0,249,255,0.3)]"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <KeyRound size={18} /> Change Password
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-6 border-t border-white/10 mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition cursor-pointer font-medium"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
