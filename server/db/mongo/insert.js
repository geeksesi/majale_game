const mongoos = require('mongoose');
const { user, remember_word, action_history, play_time_history } = require('./modules');

function user_exist(rubicka_id, cb) {
    user.findOne({ rubicka_id: rubicka_id }, (err, this_user) => {
        if (err) { cb({ ok: false, data: err }); }
        if (users.length > 0) {
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

// function ()

module.exports = {
    user_exist : user_exist,
}