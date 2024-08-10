const { Router } = require('express');
const {validationResult} = require('express-validator');
const Director = require('../models/Director');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const directores = await Director.find();
        res.send(directores);
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

        let director = new Director();

        director.nombres = req.body.nombres;
        director.estado = req.body.estado;

        director = await director.save();

        res.send(director);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:directorId', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            let director = await Director.findById(req.params.directorId);
            if (!director) {
                return res.send('director no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            director.nombres= req.body.nombres;
            director.estado = req.body.estado;

            director = await director.save();

            res.send(director);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});


router.delete('/:directorId', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            let director = await Director.findById(req.params.directorId);
            if (!director) {
                return res.send('director no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            director = await director.deleteOne();

            res.send(director);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    } 
});

module.exports = router;
