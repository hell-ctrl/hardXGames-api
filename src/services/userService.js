import User from "../models/User.js";

const authService = (user, email) =>
  User.findOne({
    $or: [{ email: email || user }, { username: user }],
  }).select("+password");

const createUserService = (body) => User.create(body);

export { authService, createUserService };
