const mongoos = require('mongoose');
const action_historySchema = mongoos.Schema({
    // _id: mongoos.Schema.Types.ObjectId,
    user_id: {
        type: mongoos.Schema.Types.ObjectId,
        require: true,
    },
    /**
     * - payment
     * - hint
     * - finish_lvl
     */
    type: {
        type: String,
        require: true,
    },
    value: {
        type: Number,
        require: true,
    },
    /**
     * - Xx lvl_point
     * - payment on market offer
     * - hint:(word_id)
     * - payment when play          \
     *                                # when user did payment
     * - payment from market page   /
     */
    description: {
        type: String,
        require: true,
    },
    timestamp: {
        type: Number,
        require: true,
    },
});


const play_time_historySchema = mongoos.Schema({
    // _id: mongoos.Schema.Types.ObjectId,
    user_id: {
        type: mongoos.Schema.Types.ObjectId,
        require: true,
    },
    online_timestamp: {
        type: Number,
        require: true,
    },
    offline_timestamp: {
        type: Number,
        require: false,
    },
    // how much take to full load game
    load_time: {
        type: Number,
        require: false,
    },
});


const remember_wordSchema = mongoos.Schema({
    // _id: mongoos.Schema.Types.ObjectId,
    user_id: {
        type: mongoos.Schema.Types.ObjectId,
        require: true,
    },
    word_id: {
        type: Number,
        require: true,
    },
    try_count: {
        type: Number,
        require: true,
    },
    /**
     * - wait 
     * - answered
     * - skip 
     * - expire
     */
    status : {
        type : String,
        require : true,
    },
    timestamp: {
        type: Number,
        require: true,
    },
    /**
     * will store a json of time the user did this word
     */
    try_date: {
        type: Number,
        require: true,
    },
});

const userSchema = mongoos.Schema({
    // _id: mongoos.Schema.Types.ObjectId,

    rubicka_id: {
        type: String,
        required: true,
        unique: true,
    },
    credit: {
        type: Number,
        require: false,
        default: 50 // every hint cost is : 10
    },
    play_time: {
        type: Number, // Sec
        require: false,
        default: 0,
    },
    timestamp: {
        type: Number,
        require: true,
    },

});

const user = mongoos.model("user", userSchema);
const remember_word = mongoos.model("remember_word", remember_wordSchema);
const action_history = mongoos.model("action_history", action_historySchema);
const play_time_history = mongoos.model("play_time_history", play_time_historySchema);

module.exports = {
    user: user,
    remember_word : remember_word,
    action_history : action_history,
    play_time_history : play_time_history,
};