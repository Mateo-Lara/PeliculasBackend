const { Router } = require('express');
const {validationResult} = require('express-validator');
const Tipo = require('../models/Tipo');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let tipo = new Tipo();

        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();

        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:tipoId', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            let tipo = await Tipo.findById(req.params.tipoId);
            if (!tipo) {
                return res.send('Tipo no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            tipo.nombre = req.body.nombre;
            tipo.descripcion = req.body.descripcion;

            tipo = await tipo.save();

            res.send(tipo);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.delete('/:tipoId', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            let tipo = await Tipo.findById(req.params.tipoId);
            if (!tipo) {
                return res.send('Tipo no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            tipo = await tipo.deleteOne();

            res.send(tipo);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

module.exports = router;
