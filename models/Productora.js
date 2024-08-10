const { Schema, model } = require('mongoose' );

const ProductoraSchema = Schema({
nombreProductora: {
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
slogan: {
    type: String,
    required: true,
},
descripcion: {
    type: String,
    required: true,
}
},
{
    timestamps: true
});

module.exports = model('Productora', ProductoraSchema);