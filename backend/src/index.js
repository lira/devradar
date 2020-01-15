require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect(
    process.env.MONGO_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros

// Query params: request.query (Filtros, ordenação, paginação, ...)
// Route params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body
// Mongo 1kCR8NPC9E59CYKC

app.get('/', (request, response) => {
    return response.json({ message: 'Hello OmniStack' });
});

app.listen(3333);