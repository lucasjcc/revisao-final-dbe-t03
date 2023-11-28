const jwt = require("jsonwebtoken");

const gerarToken = (id) => {
  const token = jwt.sign({ id }, process.env.SENHA_JWT);
  return token;
};

module.exports = gerarToken;
