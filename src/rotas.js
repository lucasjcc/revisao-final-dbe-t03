const express = require("express");
const { logarUsuario } = require("./controladores/usuarios");
const validarCorpoRequisicao = require("./intermediarios/validarCorpoRequisicao");
const { usuariosEsquemaLogin } = require("./esquemas/usuarios");
const { criarReceita, salvarReceita } = require("./controladores/receitas");
const verificarToken = require("./intermediarios/varificarToken");
const rotas = express();

rotas.get("/", (_req, res) => res.send("Olá, mundo!"));
rotas.post(
  "/login",
  validarCorpoRequisicao(usuariosEsquemaLogin),
  logarUsuario
);

rotas.use(verificarToken);

rotas.post("/receitas", criarReceita);
rotas.post("/salvar-receitas", salvarReceita);

module.exports = rotas;
