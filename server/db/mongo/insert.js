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

function hint_cost(rubicka_id, cb) {
    user.findOneAndUpdate({ rubicka_id: rubicka_id }, { $inc: { credit: -10 } }, (err, res) => {
        console.log(res);
        let resault = {};
        if (err) {
            resault.ok = false;
            resault.data = err2;
        } else {
            resault.ok = true;
            resault.data = res;
        }
        cb(resault);
    })
}


function finish_level(rubicka_id, value, cb) {
    user.findOneAndUpdate({ rubicka_id: rubicka_id }, { $inc: { credit: value } }, (err, res) => {
        // console.log(res);
        let resault = {};
        if (err) {
            resault.ok = false;
            resault.data = err;
        } else {
            resault.ok = true;
            resault.data = res;
        }
        cb(resault);
    })
}

function remember_me(user_id, word_id, cb) {
    remember_word.findOneAndUpdate({ user_id: user_id, word_id: word_id }, { user_id: user_id, word_id: word_id, timestamp: Math.floor(Date.now() / 1000), $inc: { try_count: 1 } }, { upsert: true },
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