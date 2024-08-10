const express = require ('express');
const {getConnection} = require ('./db/db-connection-mongo');
const cors = require ('cors');

const app = express();
const port = 4000;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/media', require('./routes/media'));
app.use('/genero', require('./routes/genero'));
app.use('/tipo', require('./routes/tipo'));
app.use('/productora', require('./routes/productora'));
app.use('/director', require('./routes/director'));
app.use('/usuario', require('./routes/usuario'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});