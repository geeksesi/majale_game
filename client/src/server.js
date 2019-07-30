import io from "socket.io-client";
const socket = io();

let season_list = {};
let word_list = {};
let user = {}
let finished_word = {};
let remembers_word = [];

async function basic_events() {
    await socket.on('connect', () => {
        console.log("we are connect")
    })
}

function get_season(language_id) {
    return new Promise((res, rej) => {
        res(season_list[language_id]);
    })
}

function season_finish_data(season_id) {
    return new Promise(async(res, rej) => {
        let this_words = await word_list[season_id];
        let usefull_array = [];
        let wait_for_words = setInterval(async() => {
            if (typeof this_words !== 'undefined') {
                clearInterval(wait_for_words)
                this_words.forEach(async element => {
                    let tmp_obj = await {
                        id: element.id,
                        question: element.word,
                        status: finished_word[element.id]
                    }
                    await usefull_array.push(tmp_obj);
                });
            }
        }, 100)
        let wait = setInterval(() => {
            if (usefull_array.length === this_words.length) {
                clearInterval(wait);
                res(usefull_array);
            }
        }, 500);
    })

}

function user_data() {
    return new Promise((res, rej) => {
        res(user);

    })
}

function get_word(season_id) {
    return new Promise((res, rej) => {
        res(word_list[season_id]);
    })
}

function play_game_data() {
    return new Promise((resolve, reject) => {
        resolve({
            finished_word: finished_word,
            remembers_word: remembers_word,
            word_list: word_list
        })
    })
}


function use_hint(word_id) {
    console.log("hello");
    return new Promise((resolve, reject) => {

        socket.emit("user_hint", word_id, (res) => {
            if (res.ok === true) {
                user.credit -= 10;
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}

function finish_level(word_id, time, is_hint, status) {
    return new Promise((resolve, reject) => {
        socket.emit("finish_level", word_id, time, is_hint, res => {
            let exp_value = 0;
            if (res.ok === true) {
                if (time <= 5) {
                    exp_value = 3;
                } else if (time <= 10) {
                    exp_value = 2;
                } else {
                    exp_value = 1;
                }
                let prize_value = exp_value * 5 * status;
                user.credit += prize_value;
                finished_word[word_id] = exp_value;
                user.exp += exp_value;
                if (is_hint) {
                    remembers_word.push(word_id);
                } else {
                    if (remembers_word.includes(word_id)) {
                        for (var i = remembers_word.length - 1; i--;) {
                            if (remembers_word[i] === word_id) remembers_word.splice(i, 1);
                        }
                    }
                }
                resolve({ ok: true, prize: prize_value })
            } else {
                reject(false)
            }
        })
    })
}

async function init(cb) {
    await basic_events();
    await socket.emit("init", 1, async res => {
        season_list = res.seasons;
        word_list = res.words;
        user = res.user;
        finished_word = res.finished_word;
        await remembers_word.push(...res.remembers_id)
        setTimeout(() => { cb(res) }, 500)
        setTimeout(async() => {
            console.log(await play_game_data());
            // console.log(word_list);
            // console.log(user);
        }, 1000)
    })
}

function season_finish(season_id, cb) {
    console.log(season_id);
    socket.emit("season_finish", season_id, res => {
        console.log(res)
        user.credit += res.data;
        cb(res.data)
    })
}

export {
    init,
    get_season,
    get_word,
    user_data,
    use_hint,
    finish_level,
    play_game_data,
    season_finish,
    season_finish_data,
}