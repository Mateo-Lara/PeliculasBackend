const { Router } = require('express');
const {validationResult} = require('express-validator');
const Productora = require('../models/Productora');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.get('/',  [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const productoras = await Productora.find();
        res.send(productoras);
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

        let productora = new Productora();

        productora.nombreProductora = req.body.nombreProductora;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;

        productora = await productora.save();

        res.send(productora);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:productoraId', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            let productora = await Productora.findById(req.params.productoraId);
            if (!productora) {
                return res.send('productora no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            productora.nombreProductora = req.body.nombreProductora;
            productora.estado = req.body.estado;
            productora.slogan = req.body.slogan;
            productora.descripcion = req.body.descripcion;

            productora = await productora.save();

            res.send(productora);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.delete('/:productoraId', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            let productora = await Productora.findById(req.params.productoraId);
            if (!productora) {
                return res.send('productora no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            productora = await productora.deleteOne();

            res.send(productora);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

module.exports = router;
