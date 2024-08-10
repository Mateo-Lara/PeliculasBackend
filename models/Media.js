const { Schema, model } = require('mongoose' );

const MediaSchema = Schema({
    serial: {
        type: String,
        unique: true,
        required: true,
      },
      titulo: {
        type: String,
        required: true,
      },
      sinopsis: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        unique: true,
        required: true,
      },
      portada: {
        type: String,
        required: true,
      },
      añoEstreno: {
        type: Number,
        required: true,
      },
      genero: {
        type: Schema.Types.ObjectId, ref:'Genero',
        required: true,      
      },
      director: {
        type: Schema.Types.ObjectId, ref:'Director',
        required: true,      
      },
      productora: {
        type: Schema.Types.ObjectId, ref:'Productora',
        required: true,      
      },
      tipo: {
        type: Schema.Types.ObjectId, ref:'Tipo',
        required: true,      
      },
    },
    {
        timestamps: true
    });

module.exports = model('Media', MediaSchema);