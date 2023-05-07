import bcrypt from "bcrypt";
import {
  updateUserService,
  getUserPasswordService,
  findUserByNameService,
} from "../../services/userService.js";
import { validatePasswordOrError } from "../validation.js";

const updateUser = async (req, res) => {
  let { username, avatar, password, new_password, biography, background } = req.body;

  if (!username && !avatar && !new_password && !biography) {
    return res.status(400).json({ message: "envie pelo menos um campo." });
  };

  try {
    if (new_password && password) {
      validatePasswordOrError(
        new_password,
        "a senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."
      );
      const userPassword = await getUserPasswordService(user.id);
      let isMatch = bcrypt.compareSync(password, userPassword.password);

      if (!isMatch)
        return res.status(400).json({ message: "senha incorreta." });

      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(new_password, salt);
    };
    if (username) {
      const userFromDB = await findUserByNameService(username);
      if (userFromDB)
        return res.status(400).json({ message: "esse nome de usuário já existe." });
    }

    const body = {
      username,
      avatar,
      biography,
      background,
      password,
    };

    await updateUserService(req.user.id, body);

    res.status(200).json({ message: "informações atualizadas" });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

export default updateUser;
