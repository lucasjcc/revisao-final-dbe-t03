const express = require("express");
const { logarUsuario } = require("./controladores/usuarios");
const validarCorpoRequisicao = require("./intermediarios/validarCorpoRequisicao");
const { usuariosEsquemaLogin } = require("./esquemas/usuarios");
const rotas = express();

rotas.get("/", (req, res) => res.send("Olá, mundo!"));
rotas.post(
  "/login",
  validarCorpoRequisicao(usuariosEsquemaLogin),
  logarUsuario
);

module.exports = rotas;
