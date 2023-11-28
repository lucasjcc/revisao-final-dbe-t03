const conexaoPg = require("../configuracoes/bancoDeDados");
const gerarToken = require("../utilitarias/gerarToken");
const verificarSenha = require("../utilitarias/verificarSenha");

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const texto = `
      SELECT * FROM usuarios
      WHERE email=$1;
    `;
    const valores = [email];
    const {
      rowCount: quantidadeDeUsuariosCadastrados,
      rows: usuariosCadastrados,
    } = await conexaoPg.query(texto, valores);
    if (quantidadeDeUsuariosCadastrados === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    const usuarioCadastrado = usuariosCadastrados[0];
    const senhaCriptografada = usuarioCadastrado.senha;
    const senhaConfere = verificarSenha(senha, senhaCriptografada);
    if (!senhaConfere) {
      return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
    }
    const idUsuarioLogado = usuarioCadastrado.id;
    const token = gerarToken(idUsuarioLogado);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.mensage);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  logarUsuario,
};
