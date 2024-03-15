const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const { config } = require('./config/secret');
const { routesInit } = require('./routes/configRoutes');


const app = express();
require('./db/mongoConnect');
// give ane domain access to the server
app.use(cors());

app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, 'public')));

//initialize routes
routesInit(app);
const server = http.createServer(app);


server.listen(config.PORT || 3001);