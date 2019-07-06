const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { my_io } = require('./server/server');

app.use('/', express.static('public_html'))

my_io(server);

console.log("goodbssy")
server.listen(7856, function() {
    console.log('Server listening at port %d', 7856);
});