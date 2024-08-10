const mongoose = require ('mongoose')

const getConnection = async () => {
    try {
    const url = 'mongodb+srv://MateoLara:Uu9u7nYTrqAWFGjr@peliculascluster.7apeya2.mongodb.net/?retryWrites=true&w=majority'
    
    await mongoose.connect (url);
    
    console. log( 'Conexion exitosa');
    } catch (error) {
    console. log(error) ;
    }
}

module.exports = {
    getConnection,
}
