const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { my_io } = require('./server/server');
const mongoos = require('mongoose');

mongoos.connect('mongodb://127.0.0.1:27017/majale', { useNewUrlParser: true, 'useCreateIndex': true });

app.use('/', express.static('public_html'))

my_io(server);

server.listen(7856, function() {
    console.log('Server listening at port %d', 7856);
});