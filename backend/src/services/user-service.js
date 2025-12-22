import { userModel } from "../models/user-model.js"
import { encrypt } from "../utils/services/encryption.js";

export const addUser = async (userInfo) => {
    userInfo.password = await encrypt(userInfo.password);
    return userModel.create(userInfo);
}

export const finduserByEmail = (email) => {
    return userModel.findOne({email}).exec();
}