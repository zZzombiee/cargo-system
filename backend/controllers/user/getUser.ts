import { Request, Response } from "express";
import UserModel from "../../models/User.model.js";

const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default getUser;
