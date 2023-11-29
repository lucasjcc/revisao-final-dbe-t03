const jwt = require("jsonwebtoken");
const conexaoPg = require("../configuracoes/bancoDeDados");

const verificarToken = async (req, res, next) => {
  const { authorization: autorizacao } = req.headers;
  if (!autorizacao) {
    return res.status(401).json({ mensagem: "Usuário inválido" });
  }
  try {
    const token = autorizacao.split(" ")[1];
    const { id: idUsuarioLogado } = jwt.verify(token, process.env.SENHA_JWT);

    const textoQuery = `
      SELECT id, nome, email FROM usuarios
      WHERE id = $1;
    `;
    const valoresQuery = [idUsuarioLogado];

    const { rowCount: quantidadeUsuarios, rows: usuariosLogados } =
      await conexaoPg.query(textoQuery, valoresQuery);

    if (quantidadeUsuarios === 0) {
      return res.status(401).json({ mensagem: "Usuário inválido" });
    }

    req.usuarioLogado = usuariosLogados[0];

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = verificarToken;
