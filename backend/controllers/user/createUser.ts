import { Request, Response } from "express";
import { UserModel } from "../../models/User.model.js";

const createUser = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  try {
    const user = await new UserModel({ userName, email, password }).save();
    res.status(200).json({ message: "Created new User", user: user });
  } catch (error) {
    res.json({ message: error });
  }
};

export default createUser;
