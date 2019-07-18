const { get_sesson, words_season } = require('./db/mysql/mysql');
const { user_exist } = require('./db/mysql/mysql');

module.exports.my_io = function(server) {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        // console.log("heelo")

        socket.on("season_list", (language_id, cb) => {
            get_sesson(language_id, res => {
                if (res.ok === true) {
                    cb(res);
                }
            })
        })

        socket.on("word_season", (season_id, answer_language_id, cb) => {

            words_season(season_id, answer_language_id, res => {
                if (res.ok === true) {
                    cb(res);
                }
            })
        })


        socket.on("user_login", (rubicka_id, cb) => {

            user_exist(rubicka_id, res => {
                console.log(res);
                if (res.ok === true) {
                    cb(res);
                }
            })
        })


    });

}