const instaciaAxios = require("../configuracoes/axios");
const conexaoPg = require("../configuracoes/bancoDeDados");

const criarReceita = async (req, res) => {
  const { produtos } = req.body;

  if (!produtos) {
    return res.status(400).json({ mensagem: "Obrigatório passar os produtos" });
  }

  try {
    const textoDaConversa = `Crie uma receita em um parágrafo com os seguintes produtos: ${produtos.join(
      ", "
    )}`;

    const corpo = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: textoDaConversa,
        },
      ],
    };

    const cabecalho = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };

    const { data: dados } = await instaciaAxios.post(
      "https://api.openai.com/v1/chat/completions",
      corpo,
      cabecalho
    );

    const receita = dados.choices[0].message.content;

    return res.json({ receita });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const salvarReceita = async (req, res) => {
  const { id: idUsuarioLogado } = req.usuarioLogado;

  const { receita } = req.body;

  if (!receita) {
    return res.status(400).json({ mensagem: "O campo receita é obrigatório" });
  }

  try {
    const textoQuery = `
      INSERT INTO receitas
        (descricao, usuario_id)
      VALUES
        ($1, $2)
      RETURNING
        *;
    `;

    const valoresQuery = [receita, idUsuarioLogado];

    const { rows: receitasCadastradas } = await conexaoPg.query(
      textoQuery,
      valoresQuery
    );
    const receitaCadastrada = receitasCadastradas[0];
    return res.status(201).json(receitaCadastrada);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  criarReceita,
  salvarReceita,
};
