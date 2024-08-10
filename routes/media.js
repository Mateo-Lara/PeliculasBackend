const { Router } = require('express');
const Media = require('../models/Media');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.get('/', [validarJWT], async function(req, res){
    try {
        const medias = await Media.find().populate([
            {
                path: 'genero', select: 'nombre estado'
            },
            {
                path: 'director', select: 'nombres estado'
            },
            {
                path: 'productora', select: 'nombreProductora estado'
            },
            {
                path: 'tipo', select: 'nombre'
            }
        ]);
        res.send(medias);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', [validarJWT, validarRolAdmin], async function(req, res){
    try{ 
        const existeMediaPorSerial = await Media.findOne({serial: req.body.serial});
        const existeUrlMedia = await Media.findOne({url: req.body.url});

        if (existeMediaPorSerial) {
            return res.status(400).send('Ya existe el serial para otro media');
        }

        if (existeUrlMedia) {
            return res.status(400).send('Ya existe el url para otro media');
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.portada = req.body.portada;
        media.añoEstreno = req.body.añoEstreno;
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;

        media = await media.save();

        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear media')
    }
});

router.put('/:mediaId', [validarJWT, validarRolAdmin], async function(req, res){
    try{
        let media = await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(400).send('Media no existe');
        }
        
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.portada = req.body.portada;
        media.añoEstreno = req.body.añoEstreno;
        media.genero = req.body.genero;
        media.director = req.body.director;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save();

        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar media')
    }
});

router.get('/:mediaId', [validarJWT, validarRolAdmin], async function(req, res){
    try {
        const media = await media.findById(req.params.mediaId);
        if(!media){
            return res.status(404).send('Media no existe');
        }
        res.send (media); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar media');
    }
});

router.delete('/:mediaId', [validarJWT, validarRolAdmin], async function(req, res){
    try{
        let media = await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(400).send('Media no existe');
        }

        media = await media.deleteOne();

        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al eliminar media')
    }
});

module.exports = router; 
