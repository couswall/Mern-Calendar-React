/*
    Events Routes
    /api/events
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

// Todas las rutas deben de pasar por la validación del JWT
router.use(validarJWT); //Todas las rutas que esten debajo de esta línea de código pasarán por ese middleware

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
            '/',
            [
                check('title', 'El título es obligatorio').not().isEmpty(),
                check('start', 'La fecha de inicio es oblitagoria').custom(isDate),
                check('end', 'La fecha de fin es obligatoria' ).custom(isDate), 
                validarCampos,
            ], 
            crearEvento
        );

// Actualizar Evento
router.put(
            '/:id',
            [
                check('title', 'El título es obligatorio').not().isEmpty(),
                check('start', 'La fecha de inicio es oblitagoria').custom(isDate),
                check('end', 'La fecha de fin es obligatoria' ).custom(isDate), 
                validarCampos,
            ], 
            actualizarEvento
        );

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;