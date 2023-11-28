const joi = require("joi");

const usuariosEsquemaLogin = joi.object({
  email: joi.string().email().max(100).required().messages({
    "any.type": "O e-mail é obrigatório",
    "string.base": "O email deve ser um texto",
    "string.email": "O e-mail deve ser um texto",
    "string.max": "O e-mail deve ter no máximo 100 caracteres",
  }),
  senha: joi.string().required().messages({
    "any.required": "A senha é obrigatória",
    "string.base": "A senha deve ser um texto",
  }),
});

const usuariosEsquemaCadastro = joi.object({
  nome: joi.string().required().messages({
    "any.required": "A senha é obrigatória",
    "string.base": "A senha deve ser um texto",
  }),
  email: joi.string().email().max(100).required().messages({
    "any.type": "O e-mail é obrigatório",
    "string.base": "O email deve ser um texto",
    "string.email": "O e-mail deve ser um texto",
    "string.max": "O e-mail deve ter no máximo 100 caracteres",
  }),
  senha: joi.string().required().messages({
    "any.required": "A senha é obrigatória",
    "string.base": "A senha deve ser um texto",
  }),
});

module.exports = {
  usuariosEsquemaLogin,
  usuariosEsquemaCadastro,
};
