const {response} = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    // Se toma el header de x-token con el token
    const token = req.header('x-token');

    // Si no existe un token o el token expiró se regresa un status 401
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
    };

    try {
        
        // * Verifica que el token sea válido
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        );
        
        // Se modifica el contenido de la request
        req.name = payload.name;
        req.uid = payload.uid;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }

    next();
};

module.exports = {
    validarJWT,
}