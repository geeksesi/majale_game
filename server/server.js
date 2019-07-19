const { get_sesson, words_season } = require('./db/mysql/mysql');
const { user_exist, hint_cost } = require('./db/mongo/insert');

module.exports.my_io = function(server) {
    const io = require('socket.io')(server);
    // let online_users = {}
    io.on('connection', socket => {

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
                // console.log(res);
                if (res.ok === true) {
                    socket.rubicka_id = res.data.rubicka_id;
                    cb(res);
                }
            })
        })


        socket.on("user_hint", cb => {
            console.log(socket.rubicka_id)
            hint_cost(socket.rubicka_id, res => {
                console.log(res);
                // if (res.ok === true) {
                    cb(res);
                // }
            })
        })


    });

}