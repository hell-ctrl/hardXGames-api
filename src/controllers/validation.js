const existsOrError = (value, error) => {
  if (!value) throw error;
  if (Array.isArray(value) && value.length == 0) throw error;
  if (typeof value === "string" && !value.trim()) throw error;
};

const notExistsOrError = (value, error) => {
  try {
    existsOrError(value, error);
  } catch {
    return;
  }

  throw error;
};

const equalOrError = (valueA, valueB, error) => {
  if (valueA !== valueB) throw error;
};

const validateEmailOrError = (email, error) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
  if (!emailRegex.test(email)) throw error;
};

const validatePasswordOrError = (password, error) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(password)) throw error;
}

const userExistsInDB = (userDB, user, email) => {
  if(userDB?.username == user) {
    throw "nome usuário já cadastrado."
  } else if (userDB?.email == email) {
    throw "email já cadastrado."
  }
}

export { existsOrError, notExistsOrError, equalOrError, validateEmailOrError, validatePasswordOrError, userExistsInDB };
