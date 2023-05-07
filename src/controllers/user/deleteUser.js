import bcrypt from "bcrypt";
import { deleteUserService, getUserPasswordService } from "../../services/userService.js";

const deleteUser = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  try {
    const userFromDB = await getUserPasswordService(userId);
    var isMatch = bcrypt.compareSync(password, userFromDB.password);

    if (isMatch) {
      await deleteUserService(userId);
      return res.status(200).json({ message: "usuário excluído com sucesso." });
    }
    res.status(400).json({ message: "senha inválida" });
  } catch {
    res.status(500).json({ message: "ocorreu um erro ao deletar usuário" });
  }
};

export default deleteUser;
