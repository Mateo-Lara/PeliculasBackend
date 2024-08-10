const { Schema, model } = require('mongoose' );

const DirectorSchema = Schema({
nombres: {
    type: String,
    required: true,
},
estado: {
    type: String,
    required: true,
    enum: [
        'Activo', 'Inactivo'
    ]
}
},
{
    timestamps: true
});

module.exports = model('Director', DirectorSchema);