import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/index.js";
import trackRoutes from "./routes/track.router.js";
import userRouter from "./routes/user.router.js";
const app = express();
// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        "https://cargo-system-iota.vercel.app",
        "https://cargo-system-a8x0sfb0s-itgelts-projects-35418efe.vercel.app",
        "http://localhost:3000",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Routes
app.get("/", (_req, res) => {
    res.json({ message: "Cargo backend running 🚀" });
});
app.use("/user", userRouter);
app.use("/track", trackRoutes);
app.use((err, _req, res, _next) => {
    console.error("❌ Server Error:", err);
    const status = err.status ?? 500;
    const response = {
        success: false,
        message: err.message ?? "Internal Server Error",
    };
    res.status(status).json(response);
});
const port = process.env.PORT || 8000;
// Start Server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`✅ Server running at http://localhost:${port}/`);
        });
    }
    catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};
startServer();
