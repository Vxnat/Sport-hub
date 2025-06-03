// Import built-in modules
import http from "http";

// Import third-party modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

// Import local modules
import route from "./routes/index.js";

// Exception handler
import errorHandler from "./exceptions/errorHandler.js";

//Assocation Models
import "./models/association.js";

// Initialize Express app
const app = express();

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);

// ConnectDB
import { connectDB } from "./config/db.js";
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(morgan("dev"));

route(app);

// Exception handler : Xử lý lỗi tập trung
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
