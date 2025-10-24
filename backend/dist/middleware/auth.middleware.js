import jwt from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin")
        return res
            .status(403)
            .json({ success: false, message: "Admin only access" });
    next();
};
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // decoded contains user id and email
        next();
    }
    catch (err) {
        return res
            .status(403)
            .json({ success: false, message: "Invalid or expired token" });
    }
};
