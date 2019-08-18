const { get_season, words_season } = require('./db/mysql/mysql');
const { user_exist, hint_cost, finish_level, remember_me, finish_again_level, complete_remember, season_finish, user_play_time_history } = require('./db/mongo/insert');
const { user, remember_word, action_history } = require('./db/mongo/modules');

module.exports.my_io = function (server) {
    const io = require('socket.io')(server, { pingInterval: 3000 });
    io.on('connection', socket => {

        socket.on("init", async (rubicka_id, cb) => {
            socket.online_timestamp = Math.floor(Date.now() / 1000);

            let export_object = {
                seasons: {},
                words: {},
                // user: ,
                finished_word: {},
                remembers_id: [],
                finished_season: [],
            }
            await user_exist(rubicka_id, async res => {
                if (res.data === null) {
                    await user_exist(rubicka_id, async res2 => {
                        export_object.user = res2.data;
                        socket._id = res2.data._id;
                        socket.rubicka_id = res2.data.rubicka_id;
                    })
                } else {
                    export_object.user = res.data;
                    socket._id = res.data._id;
                    socket.rubicka_id = res.data.rubicka_id;
                }

                await action_history.find({ type: 'finish_word', user_id: socket._id }, (err, actions) => {
                    actions.forEach(async action => {
                        export_object.finished_word[action.value] = await action.description;
                    })
                });

                await remember_word.find({ user_id: socket._id, status: 'wait', timestamp: { $gt: socket.online_timestamp + 64800 } }, (err, remembers) => {
                    remembers.forEach(remember => {
                        export_object.remembers_id.push(remember.word_id)
                    })
                });

                await action_history.find({ user_id: socket._id, type: 'season_finish' }, (err, actions) => {
                    actions.forEach(async action => {
                        await export_object.finished_season.push(action.value);
                    })
                })
            })


            let howmany_wait;
            let finished = false;
            await get_season(2, async res => {
                export_object.seasons[2] = await res.data;
                if (Array.isArray(res.data)) {
                    howmany_wait = 20;
                    for (let i = 0; i < res.data.length; i++) {
                        const element = res.data[i];
                        await words_season(element.id, 1, word => {
                            export_object.words[element.id] = word.data;
                        });
                    }
                }
            })
            // No Arabic for now
            // await get_season(3, async res => {
            //     export_object.seasons[3] = await res.data;
            //     if (Array.isArray(res.data)) {
            //         res.data.forEach(element => {
            //             words_season(element.id, 1, word => {
            //                 export_object.words[element.id] = word.data;
            //             });
            //         });
            //     }
            // })

            let t = setInterval(() => {
                if ((typeof howmany_wait !== 'undefined' && Object.keys(export_object.words).length >= howmany_wait)) {
                    setTimeout(() => {
                        clearInterval(t);
                        cb(export_object);
                    }, 1000)
                }
            }, 500);

        })


        socket.on("loaded", () => {
            socket.loaded_timestamp = Math.floor(Date.now() / 1000);
        })

        socket.on('disconnect', (reason) => {
            // console.log(reason);
            let offline_timestamp = Math.floor(Date.now() / 1000);
            let online_timestamp = socket.online_timestamp;
            let loading_time = socket.loaded_timestamp - socket.online_timestamp;
            user_play_time_history(socket._id, online_timestamp, offline_timestamp, loading_time, res => {

            })
        });

        socket.on("user_hint", (word_id, cb) => {
            hint_cost(socket.rubicka_id, word_id, res => {
                cb(res);
            })
        })


        socket.on("finish_level", (word_id, time, use_hint, cb) => {
            let prize_value;
            if (time <= 5) {
                prize_value = 15;
                xp_value = 3;
            } else if (time <= 10) {
                prize_value = 10;
                xp_value = 2;
            } else {
                prize_value = 5;
                xp_value = 1;
            }
            if (use_hint) {
                remember_me(socket._id, word_id, res => { })
            } else {
                complete_remember(socket._id, word_id, res => { })
            }
            action_history.findOne({ type: 'finish_lvl', user_id: socket._id, word_id: word_id }, (err, action) => {
                if (action !== null) {
                    if (action.description < xp_value) {
                        finish_again_level(socket.rubicka_id, word_id, ((prize_value) - (action.description * 5)), (xp_value - action.description), res => {
                            if (res.ok === true) {
                                cb(res);
                            }
                        });
                    }
                } else {
                    finish_level(socket.rubicka_id, word_id, prize_value, xp_value, res => {
                        if (res.ok === true) {
                            cb(res);
                        }
                    });
                }
            })
        })


        socket.on("season_finish", (season_id, cb) => {
            // let array_of_prize = [5, 10, 5, 10, 5, 10, 15, 10, 5, 15, 20, 10, 5, 20, 15, 10, 5, 50, 10, 15, 5, 25, 15, 25, 5, 10, 15];
            // let random_prize = array_of_prize[Math.floor(Math.random() * array_of_prize.length)];
            season_finish(socket._id, season_id, res => {
                if (res.ok) {
                    cb({ ok: true })
                }
            })
        })


        socket.on("leaderBoard", (cb) => {
            let export_array = [];
            let user_data = {};
            let users_length;
            user.find()
                .sort({ xp: 'desc' })
                .exec((err, users) => {
                    if (err) { cb({ ok: false, data: null }); return false; }
                    // cb({ok:true, data:users});return true;
                    users_length = users.length;
                    user_data = { ok: false }
                    for (let i = 0; i < users.length; i++) {
                        if (export_array.length < 10) {
                            users[i].rank = i;
                            export_array.push(users[i]);
                            // if (typeof socket.rubicka_id !== 'undefined' && users[i].rubicka_id === socket.rubicka_id) {
                            //     // user_data = { ok: true }
                            // }
                        }
                        if (typeof socket.rubicka_id !== 'undefined' && users[i].rubicka_id === socket.rubicka_id) {
                            users[i].rank = i;
                            users[i].rb_id = socket.rubicka_id;
                            user_data.ok = true;
                            user_data.data = users[i];
                            user_data.rank = (i + 1);
                        }
                    }
                })

            let wait = setInterval(() => {
                if (export_array.length > 9 || (typeof users_length !== 'undefined' && export_array.length === users_length)) {
                    if (typeof socket.rubicka_id === 'undefined' && user_data.ok === false) {
                        clearInterval(wait);
                        cb({ ok: true, data: export_array })
                    } else if (typeof socket.rubicka_id !== 'undefined' && user_data.ok !== false) {
                        clearInterval(wait);
                        cb({ ok: true, data: [...export_array], user: user_data })
                    }
                }
            }, 200)

        })


        socket.on("userDetail", (object, cb) => {
            user.findOneAndUpdate({ rubicka_id: socket.rubicka_id }, {
                name: object.name,
                avatar: object.av_name,

            }, { upsert: true }, (err, new_user) => {
                if (err) { cb({ ok: false, data: err }); } else {
                    cb({ ok: true, data: new_user });
                    return true;
                }
            })
        });


    });
}