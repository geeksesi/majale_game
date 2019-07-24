const mongoos = require('mongoose');
const { user, remember_word, action_history, play_time_history } = require('./modules');

function user_exist(rubicka_id, cb) {

    user.findOne({ rubicka_id: rubicka_id }, (err, this_user) => {
        if (err) { cb({ ok: false, data: err }); }
        if (this_user !== null) {
            cb({ ok: true, data: this_user });
            return true;
        }
        const add_user = new user({
            rubicka_id: rubicka_id,
            timestamp: Math.floor(Date.now() / 1000),

        });
        let resault = {};
        add_user.save((err2, res) => {
            if (err) {
                resault.ok = false;
                resault.data = err2;
            } else {
                resault.ok = true;
                resault.data = res;
            }
            cb(resault);
        })
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
        status: status,
        timestamp: Math.floor(Date.now() / 1000),
    });
    new_action.save((err, res) => {
        if (err) { cb(false) } else { cb(res) }
    })
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
        add_action(res._id, "finish_word", word_id, (exp_value + " lvl_point"), (action) => {
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

function remember_me(user_id, word_id, cb) {
    remember_word.findOneAndUpdate({ user_id: user_id, word_id: word_id }, { user_id: user_id, word_id: word_id, timestamp: Math.floor(Date.now() / 1000), $inc: { try_count: 1 }, status: 'wait' }, { upsert: true },
        (err, res) => {
            console.log(res)
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

module.exports = {
    user_exist: user_exist,
    hint_cost: hint_cost,
    finish_level: finish_level,
    remember_me: remember_me
}