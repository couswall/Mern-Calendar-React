/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express'); 
const router = Router();
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post(
        '/new',
        [
            //middlewares
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
            validarCampos
        ], 
        crearUsuario 
    ); 

router.post(
        '/',
        [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe de ser de más de 6 caracteres').isLength({min:6}),
            validarCampos,
        ], 
        loginUsuario
    ); 

// Si solo es un middleware se puede añadir de esta forma, si son más en un arreglo
router.get('/renew', validarJWT, revalidarToken); 


module.exports = router; 