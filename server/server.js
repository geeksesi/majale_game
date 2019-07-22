const { get_season, words_season } = require('./db/mysql/mysql');
const { user_exist, hint_cost, finish_level, remember_me } = require('./db/mongo/insert');

module.exports.my_io = function(server) {
    const io = require('socket.io')(server);
    // let online_users = {}
    io.on('connection', socket => {
        console.log("hello")

        socket.on("init", async(rubicka_id, cb) => {
            // console.log(await get_season(3));
            let export_object = {
                seasons: {},
                words: {},
                // user: ,
            }
            await get_season(2, async res => {
                export_object.seasons[2] = await res.data;
                if (Array.isArray(res.data)) {
                    res.data.forEach(element => {
                        words_season(element.id, 1, word => {
                            // console.log(word)
                            export_object.words[element.id] = word.data;
                        });
                    });
                }
            })
            await get_season(3, async res => {
                export_object.seasons[3] = await res.data;
                if (Array.isArray(res.data)) {
                    res.data.forEach(element => {
                        words_season(element.id, 1, word => {
                            export_object.words[element.id] = word.data;
                        });
                    });
                }
            })

            await user_exist(rubicka_id, res => {
                export_object.user = res.data;
            })


            // socket.rubicka_id = export_object.user.rubicka_id;
            // socket._id = export_object.user._id;

            setInterval(() => {
                if (Object.keys(export_object.words).length) {
                    // console.log(export_object);
                    setTimeout(() => {
                        cb(export_object);
                    }, 500)
                }
            }, 500);

            //     console.log(export_object);
        })


        socket.on("season_list", (language_id, cb) => {
            get_season(language_id, res => {
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
                    socket._id = res.data._id;
                    cb(res);
                }
            })
        })


        socket.on("user_hint", cb => {
            hint_cost(socket.rubicka_id, res => {
                cb(res);
            })
        })


        socket.on("finish_level", (word_id, time, use_hint, cb) => {
            // console.log(word_id + " " + time + " " + use_hint);
            let prize_value;
            if (time <= 5) {
                prize_value = 10;
            } else if (time <= 10) {
                prize_value = 7;
            } else {
                prize_value = 5;
            }
            if (use_hint) {
                remember_me(socket._id, word_id, res => {
                    // console.log(res)
                })
            }
            finish_level(socket.rubicka_id, prize_value, res => {
                // console.log(res);
                if (res.ok === true) {
                    cb(res);
                }
            })
        })


    });

}