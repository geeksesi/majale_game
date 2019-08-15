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
     * - finish_word
     * - season_finish
     */
    type: {
        type: String,
        require: true,
    },
    /**
     * on finish_word : word_id
     * on payment : payment package_id
     * on hint : word_id
     * on season_finish : season_id
     */
    value: {
        type: Number,
        require: true,
    },
    /**
     * - exp value on finish word
     * - empty on hint
     * - prize value on season_finish
     * - payment on market offer
     * - payment when play          \
     *                                # when user did payment
     * - payment from market page   /
     */
    description: {
        type: String,
        require: false,
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
        default :0,
    },
    /**
     * - wait 
     * - answered
     * - skip 
     * - expire
     */
    status : {
        type : String,
        default : "wait"
    },
    timestamp: {
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
    name: {
        type: String,
        required: false,
        default : null
    },
    avatar: {
        type: String,
        required: false,
        default : 'avatar1'
    },
    credit: {
        type: Number,
        require: false,
        default: 50 // every hint cost is : 10
    },
    play_time: {
        type: Number, // counter
        require: false,
        default: 0,
    },
    xp : {
        type : Number,
        require : true,
        default : 0
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