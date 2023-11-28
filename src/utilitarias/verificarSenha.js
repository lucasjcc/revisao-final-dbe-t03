const verificarSenha = (senha, senhaCriptografada) => {
  if (senha === senhaCriptografada) {
    return true;
  }
  return false;
};

module.exports = verificarSenha;
