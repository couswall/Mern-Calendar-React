const { response } = require("express");
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    // * Trae todos los eventos creados
    const eventos = await Evento.find(); // .populate('user', 'name') //nos ayuda rellenar la información del usuario en la respuesta
                                

    return res.status(200).json({
        ok: true,
        eventos,
    });
};


const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {
            
        evento.user = req.uid; // Este dato se esta asignando a la request en el validar-jwt.js
        const eventoGuardado = await evento.save();
        return res.status(200).json({
            ok: true,
            evento: eventoGuardado,
        });

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    
    }
    
};

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventoId);

        // * Evalua si existe un evento con el id que le proporcionaron
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por el Id'
            });
        };

        // * Evalua si la persona que edita el evento creó el evento
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene prvilegios para editar este evento'
            })
        };

        // * Establece el nuevo evento
        const nuevoEvento = {
            ...req.body,
            user: uid,
        };

        // * Actualiza el evento
        // El parámetro de {new: true} significa que en la respuesta enviará el objeto actualizado, no el objeto anterior
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        // * Evaluar si el evento existe
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        };

        // * Evalua si el usuario que elimina el evento también lo creó
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene prvilegios para eliminar este evento'
            });
        };

        // * Elimina el evento
        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
        
        return res.status(200).json({
            ok: true,
            evento: eventoEliminado,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
};