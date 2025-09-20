// src/pages/Dashboard.jsx
import React, { useState } from "react";



// Change Password Page
const ChangePassword = () => (
  <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Change Password</h2>
    <form className="space-y-4">
      <input
        type="password"
        placeholder="Current Password"
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <input
        type="password"
        placeholder="New Password"
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-900 to-indigo-300 font-semibold hover:scale-[1.01] transition-transform">
        Update Password
      </button>
    </form>
  </div>
);

// Messages Page
const Messages = () => (
  <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Messages</h2>
    <p className="text-gray-300">This is where messages will appear.</p>
  </div>
);

// Event Permissions Page
const EventPermissions = () => (
  <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Event Permissions</h2>
    <p className="text-gray-300">
      Manage which users have permission to access or participate in events.
    </p>
  </div>
);
const Dashboard = () => {
  const [activePage, setActivePage] = useState("password");

  const renderContent = () => {
    switch (activePage) {
      case "password":
        return <ChangePassword />;
      case "messages":
        return <Messages />;
      case "permissions":
        return <EventPermissions />;
      default:
        return <ChangePassword/>;
    }
  };

  return (
    <div className="pt-[100px] min-h-screen  bg-gradient-to-r from-black to-blue-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                activePage === "password" ? "text-cyan-500" : ""
              }`}
              onClick={() => setActivePage("password")}
            >
              Change Password
            </li>
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                activePage === "messages" ? "text-cyan-500" : ""
              }`}
              onClick={() => setActivePage("messages")}
            >
              Messages
            </li>
            <li
              className={`cursor-pointer hover:text-cyan-400 ${
                activePage === "permissions" ? "text-cyan-500" : ""
              }`}
              onClick={() => setActivePage("permissions")}
            >
              Event Permissions
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-red-400 p-8">{renderContent()}</main>
      {/* <div className="">hello</div> */}
    </div>
  );
};
export default Dashboard;
