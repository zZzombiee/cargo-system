import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // 👈 secure this in .env
// ============================
// 🧱 Register
// ============================
export const registerUser = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;
        if (!name || !email || !number || !password)
            return res
                .status(400)
                .json({ success: false, message: "All fields required" });
        // Check if email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser)
            return res
                .status(400)
                .json({ success: false, message: "Email already in use" });
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            number,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                number: newUser.number,
                role: newUser.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ============================
// 🔐 Login
// ============================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ success: false, message: "Email and password required" });
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        // Create JWT
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                number: user.number,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ============================
// 👤 Get all users (Admin only)
// ============================
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ============================
// 👁️ Get user by ID
// ============================
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
