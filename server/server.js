const { get_sesson, words_season } = require('./db/mysql/mysql');

module.exports.my_io = function(server) {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        console.log("heelo")

        socket.on("season_list", (language_id, cb) => {
            // console.log(language_id);
            get_sesson(language_id, res => {
                if (res.ok === true) {
                    cb(res);
                }
            })
        })

        socket.on("word_season", (season_id, answer_language_id, cb) => {
            // console.log(language_id);
            words_season(season_id, answer_language_id, res => {
                if (res.ok === true) {
                    cb(res);
                }
            })
        })
    });

}