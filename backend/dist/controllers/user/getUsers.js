import UserModel from "../../models/User.model.js";
const getUsers = async (_req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users: users });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
export default getUsers;
