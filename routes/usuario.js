const { Router } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.get('/', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', [validarJWT, validarRolAdmin],
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            const existeUsuario = await Usuario.findOne({ email: req.body.email });
            if (existeUsuario) {
                return res.status(400).send('Email ya existe');
            }

            let usuario = new Usuario();

            usuario.nombre = req.body.nombre;
            usuario.email = req.body.email;
            usuario.estado = req.body.estado;

            const salt = bycript.genSaltSync();
            const password = bycript.hashSync(req.body.password, salt);
            usuario.password = password;

            usuario.rol = req.body.rol;

            usuario = await usuario.save();

            res.send(usuario);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    });

router.put('/:usuarioId', [validarJWT, validarRolAdmin],
    async function (req, res) {
        try {
            let usuario = await Usuario.findById(req.params.usuarioId);
            if (!usuario) {
                return res.send('usuario no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            usuario.nombre = req.body.nombre;
            usuario.email = req.body.email;
            usuario.estado = req.body.estado;
            usuario.password = req.body.password;
            usuario.rol = req.body.rol;


            usuario = await usuario.save();

            res.send(usuario);
        } catch (error) {
            console.log(error);
            res.send('Ocurrio un error');
        }
    });

router.delete('/:usuarioId', [validarJWT, validarRolAdmin],
    async function (req, res) {
        try {
            let usuario = await Usuario.findById(req.params.usuarioId);
            if (!usuario) {
                return res.send('usuario no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            usuario = await usuario.deleteOne();

            res.send(usuario);
        } catch (error) {
            console.log(error);
            res.send('Ocurrio un error');
        }
    });

module.exports = router;