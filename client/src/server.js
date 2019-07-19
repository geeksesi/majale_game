import io from "socket.io-client";
const socket = io();

let season_list = {};
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

async function init() {
    let loader = 0;
    await basic_events();
    await socket.emit("season_list", 1, res => {
        season_list[1] = res.data;
        res.data.forEach(s => {
            socket.emit("word_season", s.id, 1, words => {
                word_list[s.id] = words.data;
            })
        });
    });
    await socket.emit("season_list", 2, async res => {
        season_list[2] = res.data;
        await res.data.forEach(async s => {
            await socket.emit("word_season", s.id, 1, async words => {
                word_list[s.id] = words.data;
                await loader++;
            })
        });
    });
    await loader++;
    await socket.emit("season_list", 3, res => {
        season_list[3] = res.data;
        res.data.forEach(s => {
            socket.emit("word_season", s.id, 1, words => {
                word_list[s.id] = words.data;
            })
        });
    });

    await socket.emit("user_login", 1, res => {
        user = res.data;
    });

}

export {
    init,
    get_season,
    get_word,
    user_data,
    use_hint,
}