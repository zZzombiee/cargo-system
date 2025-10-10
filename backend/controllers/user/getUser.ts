import { Request, Response } from "express";
import { UserModel } from "../../models/User.model.js";

const getUser = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default getUser;
