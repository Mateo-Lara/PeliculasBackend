const { Router } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');
const {GenerarJWT} = require ('../helpers/jwt');

const router =  Router();

router.post('/',
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            const usuario = await Usuario.findOne({ email: req.body.email });
            if (!usuario) {
                return res.status(400).json({mensaje: 'Usuario no encontrado'});
            }

            //validar contraseñas
            const esIgual = bycript.compareSync(req.body.password, usuario.password);
            if(!esIgual){
                res.status(400).json({ mensaje: 'Usuario no encontrado'})
            }

            //generar token
            const token = GenerarJWT(usuario);

            res.json({
                _id: usuario._id,
                nombre: usuario.nombre,
                rol: usuario.rol,
                email: usuario.email,
                access_token: token
            });

        } catch(error){
            console.log(error);
            res.status(500).json({mensaje: 'internal server error'});
        }
});

module.exports = router;