const validarCorpoRequisicao = (esquema) => {
  return async (req, res, next) => {
    try {
      await esquema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  };
};

module.exports = validarCorpoRequisicao;
