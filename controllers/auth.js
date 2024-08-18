const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

// El response se agrega para tener la ayuda del intellihence
const crearUsuario = async (req, res = response ) => {
    
    const {email, password} = req.body;
    
    try {

        let usuario = await Usuario.findOne({email:email});
        // Si se encuentra un usuario con el mismo email, va a regresar a ese usuario. En caso de que no regresará null
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email',
            });
        }
        
        usuario = new Usuario(req.body);

        // * Encriptación de contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        // * Grabación en base de datos
        await usuario.save();

        // ! Generar Json Web Token
        const token = await generarJWT(usuario.uid, usuario.name);
        
        //Solo se debe de envíar una sola respuesta, si se envía más de una respuesta dará error
        res.status(201).json({
            ok: true, 
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name,
        }); 

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Avise al administrador que hubo un fallo',
            token,
        });
    }

    // Manejo de errores
    // const errors = validationResult(req);
    // Si hay errores se ejecutará lo siguiente
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped() 
    //     });
    // }

}


const loginUsuario = async (req, res = response) => {

    const {email,password} = req.body;

    try {
        // Encuentra al usuario con ese email        
        const usuario = await Usuario.findOne({email});

        // Si no hay un usuario con ese email entonces el usuario no existe
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe con ese email',
            });
        };

        // * Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto",
            });
        }

        // ! Generar Json Web Token
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        }); 
    

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Avise al administrador que hubo un fallo',
        });
    }

    
}

const revalidarToken = async (req, res = response) => {

    const name = req.name;
    const uid = req.uid;

    const token = await generarJWT(uid, name);
    
    res.json({
        ok: true,
        msg:'renew',
        uid,
        name,
        token,
    }); 

}; 



module.exports = {
    crearUsuario, 
    loginUsuario, 
    revalidarToken,
}