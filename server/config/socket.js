// server/config/socket.js
// -------------------------------------------------------------
// Socket.IO is currently commented out as requested.
// To re-enable Socket.IO when deploying to a persistent server (Render/Railway/VPS):
// 1. Uncomment the Server import and socket logic below.
// 2. Uncomment initializeSocket(server, allowedOrigins) in api/index.js.
// -------------------------------------------------------------

/*
const { Server } = require("socket.io");

let io = null;

const initializeSocket = (server, allowedOrigins) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Client connected to Socket.IO:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected from Socket.IO:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    console.warn("⚠️ Socket.IO is not initialized or currently disabled.");
    return null;
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};
*/

// Safe fallback stubs while Socket.IO is disabled:
module.exports = {
  initializeSocket: () => {
    console.log("ℹ️ Socket.IO is currently disabled. (Uncomment in server/config/socket.js to enable)");
    return null;
  },
  getIO: () => null,
};