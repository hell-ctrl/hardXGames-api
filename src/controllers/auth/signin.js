import bcrypt from "bcrypt";
import { generateToken } from "./generateToken.js";
import { existsOrError } from "../validation.js";
import { authService } from "../../services/userService.js";

const signin = async (req, res) => {
  const { user, password } = req.body;

  try {
    existsOrError(user, "informe um usuário ou email.");
    existsOrError(password, "informe sua senha.");

    const userFromDB = await authService(user);
    existsOrError(userFromDB, "usuário e/ou senha incorretos.");

    const isMatch = bcrypt.compareSync(password, userFromDB.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "usuário e/ou senha incorretos." });
    }

    const tokens = generateToken({ id: userFromDB._id, adm: userFromDB.adm });

    res.status(200).json({
      message: "login feito com sucesso.",
      token: tokens.token,
      refresh_token: tokens.refresh_token,
    });
  } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    }
    return res.status(500).json({ message: "erro interno do servidor." });
  }
};

export default signin;
