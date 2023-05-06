import bcrypt from "bcrypt";
import { generateToken } from "./generateToken.js";
import { createUserService, authService } from "../../services/userService.js";
import {
  userExistsInDB,
  equalOrError,
  existsOrError,
  validateEmailOrError,
  validatePasswordOrError,
} from "../validation.js";

const encryptPassword = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const signup = async (req, res) => {
  let { username, email, password, confirm_password } = req.body;

  try {
    existsOrError(username, "username não informado.");
    validateEmailOrError(email, "email inválido.");
    validatePasswordOrError(
      password,
      "a senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."
    );
    equalOrError(password, confirm_password, "as senhas não coincidem.");

    const userFromDB = await authService(username, email);
    userExistsInDB(userFromDB, username, email);

    password = encryptPassword(password);

    const user = await createUserService({
      username,
      email,
      password,
      adm: false,
    });

    const tokens = generateToken({ id: user._id, adm: user.adm });

    res.status(201).json({
      message: "usuário cadastrado com sucesso.",
      token: tokens.token,
      refresh_token: tokens.refresh_token,
    });
  } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    }
    return res.status(500).json({ message: "ocorreu um erro interno do servidor." });
  }
};

export default signup;
