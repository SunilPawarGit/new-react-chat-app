import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = "http://localhost:8000";
const URL = "http://localhost:8000";

export const socket = io(URL, {
  transports: ["websocket", "polling"],
  pingInterval: 25000,
  pingTimeout: 20000,
  autoConnect: true,
});
