const { get_season } = require('./db/mysql/mysql');

module.exports.my_io = function(server) {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        io.emit('connect', "true");
    });

    io.on("season_list", (language_id, cb) => {
        get_season(language_id, cb(res => {
            if (res.ok === true){
                cb(res);
            }
        }))
    })

}