const mongoos = require('mongoose');
const { user, remember_word, action_history, play_time_history } = require('./modules');

function user_exist(rubicka_id, cb) {
    user.findOneAndUpdate({ rubicka_id: rubicka_id }, {
        rubicka_id: rubicka_id,
        credit: 50,
        xp: 0,
        timestamp: Math.floor(Date.now() / 1000),
        $inc: { play_time: 1 },

    }, { upsert: true }, (err, this_user) => {
        if (err) { cb({ ok: false, data: err }); } else {
            cb({ ok: true, data: this_user });
            return true;
        }
    })
}

function hint_cost(rubicka_id, word_id, cb) {
    user.findOneAndUpdate({ rubicka_id: rubicka_id }, { $inc: { credit: -10 } }, (err, res) => {
        // console.log(res);
        let resault = {};
        if (err) {
            resault.ok = false;
            resault.data = err2;
            cb(resault);
            return false;
        }
        // console.log(word_id)
        add_action(res._id, "hint", word_id, "", action => {
            if (action === false) {
                resault.ok = false;
                resault.data = err;
                cb(resault);
                return false;
            }
            resault.ok = true;
            resault.data = res;
            cb(resault);
        })

    })
}

function add_action(user_id, type, value, status, cb) {
    const new_action = new action_history({
        user_id: user_id,
        type: type,
        value: value,
        description: status,
        timestamp: Math.floor(Date.now() / 1000),
    });
    new_action.save((err, res) => {
        if (err) { cb(false) } else { cb(true) }
    })
}

function update_action(user_id, sureplus_status, cb) {
    action_history.findOneAndUpdate({ user_id: user_id }, {
        $inc: { description: sureplus_status },
    }, (err, res) => {
        if (err) { cb(false) } else { cb(true) }
    });
}

function finish_level(rubicka_id, word_id, prize_value, exp_value, cb) {
    user.findOneAndUpdate({ rubicka_id: rubicka_id }, { $inc: { credit: prize_value, exp_value, exp: exp_value } }, (err, res) => {
        // console.log(res);
        let resault = {};
        if (err) {
            resault.ok = false;
            resault.data = err;
            cb(resault);
            return false;
        }
        add_action(res._id, "finish_word", word_id, (exp_value), (action) => {
            if (action === false) {
                resault.ok = false;
                resault.data = err;
                cb(resault);
                return false;
            }
            resault.ok = true;
            // resault.data = res;
            cb(resault);
        })
    })
}

function finish_again_level(rubicka_id, word_id, sureplus_price, sureplus_exp, cb) {
    user.findOneAndUpdate({ rubicka_id: rubicka_id }, { $inc: { credit: sureplus_price, exp_value, exp: sureplus_exp } }, (err, res) => {
        // console.log(res);
        let resault = {};
        if (err) {
            resault.ok = false;
            resault.data = err;
            cb(resault);
            return false;
        }
        update_action(res._id, sureplus_exp, (action) => {
            if (action === false) {
                resault.ok = false;
                resault.data = err;
                cb(resault);
                return false;
            }
            resault.ok = true;
            // resault.data = res;
            cb(resault);
        })
    });
}


function remember_me(user_id, word_id, cb) {
    remember_word.findOneAndUpdate({ user_id: user_id, word_id: word_id }, { user_id: user_id, word_id: word_id, timestamp: Math.floor(Date.now() / 1000), $inc: { try_count: 1 }, status: 'wait' }, { upsert: true },
        (err, res) => {
            // console.log(res)
            let resault = {};
            if (err) {
                resault.ok = false;
                resault.data = err;
            } else {
                resault.ok = true;
                resault.data = res;
            }
            cb(resault);
        }
    )
}


function complete_remember(user_id, word_id, cb) {
    remember_word.findOneAndUpdate({ user_id: user_id, word_id: word_id }, { status: 'answered' }, (err, res) => {
        let resault = {};
        if (err) {
            resault.ok = false;
            resault.data = err;
        } else {
            resault.ok = true;
            resault.data = res;
        }
        cb(resault)
    })

}

function season_finish(user_id, season_id, prize, cb) {
    user.findOneAndUpdate({ _id: user_id }, { $inc: { credit: prize } }, (err, res) => {
        // console.log(res);
        let resault = {};
        if (err) {
            resault.ok = false;
            resault.data = err;
            cb(resault);
            return false;
        }
        add_action(user_id, "season_finish", season_id, prize, (action) => {
            if (!action) {
                resault.ok = false;
                resault.data = err;
                cb(resault);
                return false;
            } else {
                resault.ok = true;
                // resault.data = res;
                cb(resault);
            }
        })
    });
}


function user_play_time_history(user_id, online_timestamp, offline_timestamp, loaded_time, cb) {
    console.log(user_id, online_timestamp, offline_timestamp, loaded_time);
    const new_play_time = new play_time_history({
        user_id: user_id,
        online_timestamp: online_timestamp,
        offline_timestamp: offline_timestamp,
        load_time: loaded_time,
    });

    new_play_time.save((err, res) => {
        if (err) { cb(false) } else { cb(true) }
    })
}

module.exports = {
    user_exist: user_exist,
    hint_cost: hint_cost,
    finish_level: finish_level,
    remember_me: remember_me,
    finish_again_level: finish_again_level,
    complete_remember: complete_remember,
    season_finish: season_finish,
    user_play_time_history: user_play_time_history,
}