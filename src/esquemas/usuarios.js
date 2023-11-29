const joi = require("joi");

const usuariosEsquemaLogin = joi.object({
  email: joi.string().email().max(100).required().messages({
    "any.required": "O e-mail é obrigatório",
    "string.base": "O email deve ser um texto",
    "string.email": "E-mail inválido",
    "string.max": "O e-mail deve ter no máximo 100 caracteres",
  }),
  senha: joi.string().required().messages({
    "any.required": "A senha é obrigatória",
    "string.base": "A senha deve ser um texto",
  }),
});

module.exports = {
  usuariosEsquemaLogin,
};
