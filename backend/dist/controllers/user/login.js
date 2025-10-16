import jwt from "jsonwebtoken";
import { UserModel } from "../../models/User.model.js";
import bcrypt from "bcrypt";
import "dotenv/config";
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
            return res.status(401).json({
                message: `"Invalid password", ${typeof password}, ${typeof user.password}`,
            });
        }
        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            number: user.number,
        }, process.env.JWT_SECRET, { expiresIn: "10h" });
        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                number: user.number,
            },
            accessToken,
            message: "Logged in successfully!",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};
