import io from "socket.io-client";
const socket = io();

let season_list = {};
let word_list = {};
let user = {}
let finished_word = {};
let remembers_word = [];
let finished_season = [];

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

function get_finished_season(cb) {
    cb(finished_season);
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
    // console.log("hello");
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

function finish_level(word_id, season_id, time, is_hint, status, cb) {
    socket.emit("finish_level", word_id, time, is_hint, async res => {
        let xp_value = 0;
        if (res.ok === true) {
            if (time <= 5) {
                xp_value = 3;
            } else if (time <= 10) {
                xp_value = 2;
            } else {
                xp_value = 1;
            }
            let prize_value = await xp_value * 5 * status;
            user.credit += await prize_value;
            finished_word[word_id] = await xp_value;
            user.xp += await xp_value;
            if (is_hint) {
                // remembers_word.push(word_id);
            } else {
                if (remembers_word.includes(word_id)) {
                    for (var i = remembers_word.length - 1; ; i--) {
                        if (remembers_word[i] === word_id) {
                            remembers_word.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            check_season_finished(season_id, season_status => {
                cb({
                    ok: true,
                    prize: prize_value,
                    xp: xp_value,
                    season_status: season_status
                })
            })
        } else {
            cb({ ok: false })
        }
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
        await finished_season.push(...res.finished_season)
        setTimeout(() => { cb(res) }, 500)
        setTimeout(async () => {
            // console.log(await play_game_data());
            // console.log(word_list);
            // console.log(user);
        }, 1000)
    })
}

function season_finish(season_id, cb) {
    socket.emit("season_finish", season_id, res => {
        cb(res.data)
    })
}

function season_finish_data(season_id) {
    return new Promise(async (res, rej) => {
        let this_words = await word_list[season_id];
        let usefull_array = [];
        if (typeof this_words === 'undefined') {
            this_words = await word_list[season_id];
        }
        if (typeof this_words !== 'undefined') {
            this_words.forEach(async element => {
                let tmp_obj = await {
                    id: element.id,
                    question: element.word,
                    status: finished_word[element.id]
                }
                await usefull_array.push(tmp_obj);
            });
        }
        let wait = setInterval(() => {
            if (usefull_array.length === this_words.length) {
                clearInterval(wait);
                res(usefull_array);
            }
        }, 500);
    })

}

async function check_season_finished(season_id, cb) {
    let wait_for_it;
    if (finished_season.indexOf(season_id) !== -1) {
        cb(false)
        return false;
    }
    let season_data = await season_finish_data(season_id);
    let ok = []
    for (let i = 0; i < season_data.length; i++) {
        const element = season_data[i];
        if (element.status === null || typeof element.status === 'undefined' || element.status === 0) {
            if (typeof wait_for_it !== 'undefined') {
                clearInterval(wait_for_it);
            }
            cb(false);
            return false;
            break;
        } else {
            ok.push(true);
        }
    }

    wait_for_it = setInterval(() => {
        if (ok.length === season_data.length) {
            clearInterval(wait_for_it);
            finished_season.push(season_id);
            season_finish(season_id, res => {
                cb(true);
            })
        }
    }, 500);
}


function loaded_finished() {
    socket.emit("loaded");
}

function leader_board(cb) {

    socket.emit("leaderBoard", (res) => {
        if (res.ok === true) {
            console.log(res)
            cb(res.data)
        } else {
            console.log(res)
            cb(false);
        }
    })
}

function splice_word(season_id, word_id) {
    for (var i = 0; i < word_list[season_id].length; i++) {
        if (word_list[season_id][i].id === word_id) {
            word_list[season_id].splice(i, 1);
        }
    }
    setTimeout(() => {
        console.log(word_list[season_id]);
    }, 500);
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
    check_season_finished,
    loaded_finished,
    leader_board,
    get_finished_season,
    splice_word,
}