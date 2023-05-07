import User from "../models/User.js";

const authService = (user, email) =>
  User.findOne({
    $or: [{ email: email || user }, { username: user }],
  }).select("+password");

const createUserService = (body) => User.create(body);

const updateUserService = (userId, body) =>
  User.findOneAndUpdate({ _id: userId }, { ...body }, { rawResult: true });

const getUserPasswordService = (userId) =>
  User.findById(userId).select("+password");

const findUserByNameService = async (name) =>
  User.findOne({ username: { $eq: name } });

const deleteUserService = (userId) => User.findByIdAndDelete(userId);

export {
  authService,
  createUserService,
  updateUserService,
  getUserPasswordService,
  findUserByNameService,
  deleteUserService
};
