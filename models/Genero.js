const { Schema, model } = require('mongoose' );

const GeneroSchema = Schema({
nombre: {
    type: String,
    required: true,
},
estado: {
    type: String,
    required: true,
    enum: [
        'Activo', 'Inactivo'
    ]
},
descripcion: {
    type: String,
    required: true,
}
},
{
    timestamps: true
});

module.exports = model('Genero', GeneroSchema);