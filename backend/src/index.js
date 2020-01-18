require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
    process.env.MONGO_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
    return response.json({ message: 'Hello OmniStack' });
});

app.listen(3333);