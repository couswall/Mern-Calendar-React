const {response} = require('express');
const { validationResult } = require('express-validator');

/*
    El check si encuentra errores o no llama al next() para dejar paso al siguiente, pero nuestro validar-campos únicamente llamará al next() si no hay errores, ya que si hay algún error hacemos un return con un error, por lo que no dejamos seguir a express con su proceso.
*/

const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped() 
        });
    };
    next();
};

module.exports = {
    validarCampos,
}