import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../models/User.model.js";

const createUser = async (req: Request, res: Response) => {
  const { email, password, name, number } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await new UserModel({
      email,
      name,
      number,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      message: "Created new user successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        number: user.number,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

export default createUser;
