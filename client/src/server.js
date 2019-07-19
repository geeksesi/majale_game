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
        // res({
        //     "credit": 25,
        //     "play_time": 0,
        //     "_id": "5d3188f1e120931f2ef0cfa0",
        //     "rubicka_id": "1",
        //     "timestamp": 1563527409,
        //     "__v": 0
        // });
    })
}

function get_word(season_id) {
    return new Promise((res, rej) => {
        console.log(word_list[season_id])
        res(word_list[season_id]);
    })
    // return new Promise((res, rej) => {
    //     // console.log(word_list[season_id])
    //     res([{
    //             "id": 312448,
    //             "parent_id": 11,
    //             "language_id": 2,
    //             "season_sort": 1,
    //             "word": "Body",
    //             "status": "1",
    //             "answer": {
    //                 "word": "بدن",
    //                 "language_id": 1
    //             }
    //         },
    //         {
    //             "id": 312601,
    //             "parent_id": 41,
    //             "language_id": 2,
    //             "season_sort": 2,
    //             "word": "Foot",
    //             "status": "1",
    //             "answer": {
    //                 "word": "پا",
    //                 "language_id": 1
    //             }
    //         }
    //     ]);
    // })
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
    // console.log(await loader)
    await socket.emit("season_list", 2, async res => {
        season_list[2] = res.data;
        await res.data.forEach(async s => {
            await socket.emit("word_season", s.id, 1, async words => {
                // console.log(words)
                word_list[s.id] = words.data;
                await loader++;
                // console.log(loader)
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
    // setTimeout(() => console.log(loader), 3000)

    await socket.emit("user_login", 1, res => {
        user = res.data;
        // console.log(user);
    });
    // setTimeout(async ()=> console.log(await get_season(2)), 2000)
    // const seasons = await get_season(2);
    // seasons.forEach(element => {

    // });
    // setTimeout(async () => console.log(word_list), 2000)
    // let word = await get_word(1);
    // console.log(word)

}

export {
    init,
    get_season,
    get_word,
    user_data,
    use_hint,
}