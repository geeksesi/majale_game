import io from "socket.io-client";
const socket = io();

let season_list = [];
let word_list = {};
let user = {}

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
        console.log(word_list[season_id])
        res(word_list[season_id]);
    })
}


function use_hint() {
    console.log("hello");
    return new Promise((resolve, reject) => {

        socket.emit("user_hint", (res) => {
            if (res.ok === true) {
                user.credit -= 10;
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}

function finish_level(word_id, time, is_hint) {
    return new Promise((resolve, reject) => {
        socket.emit("finish_level", word_id, time, is_hint, res => {
            let prize_value = 0;
            if (res.ok === true) {
                if (time <= 5) {
                    prize_value = 10;
                } else if (time <= 10) {
                    prize_value = 7;
                } else {
                    prize_value = 5;
                }
                user.credit += prize_value;
                resolve({ ok: true, prize: prize_value })
            } else {
                reject(false)
            }
        })
    })
}

async function init(cb) {
    await basic_events();
    await socket.emit("init", 1, res => {
        season_list = res.seasons.slice();
        word_list = res.words;
        user = res.user;
        setTimeout(() => { cb(res) }, 500)
        setTimeout(() => {
            console.log(season_list);
            console.log(word_list);
            console.log(user);
        }, 1000)
    })
}

// async function init() {
//     let must_load = 4;
//     let loader = 0;
//     await socket.emit("season_list", 1, async res => {
//         season_list[1] = res.data;
//         must_load += res.data.length;
//         await res.data.forEach( async s => {
//             await socket.emit("word_season", s.id, 1, async words => {
//                 word_list[s.id] = await words.data;
//                 await loader++;
//             })
//         });
//     });
//     await socket.emit("season_list", 2, async res => {
//         season_list[2] = res.data;
//         must_load += res.data.length;
//         await res.data.forEach(async s => {
//             await socket.emit("word_season", s.id, 1, async words => {
//                 word_list[s.id] = await words.data;
//                 await loader++;
//             })
//         });
//     });
//     await socket.emit("season_list", 3, async res => {
//         season_list[3] = await res.data;
//         must_load += await res.data.length;
//         await res.data.forEach(async s => {
//             await socket.emit("word_season", s.id, 1, async words => {
//                 word_list[s.id] = await words.data;
//                 await loader++;
//             })
//         });
//     });

//     await socket.emit("user_login", 1, async res => {
//         user = await res.data;
//     });
//     console.log(must_load);
//     // setTimeout(() => {
//     // }, 5000)

// }

export {
    init,
    get_season,
    get_word,
    user_data,
    use_hint,
    finish_level,
}