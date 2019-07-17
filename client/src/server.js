import io from "socket.io-client";
const socket = io();

let season_list = {};
let word_list = {};

function basic_events() {
    socket.on('connect', () => {
        console.log("we are connect")
    })
}

function get_season(language_id) {
    return new Promise((res, rej) => {
        res(season_list[language_id]);
    })
}

function get_word(season_id) {
    // return new Promise((res, rej) => {
    //     console.log(word_list[season_id])
    //     res(word_list[season_id]);
    // })
    return new Promise((res, rej) => {
        // console.log(word_list[season_id])
        res([{
                "id": 312448,
                "parent_id": 11,
                "language_id": 2,
                "season_sort": 1,
                "word": "Body",
                "status": "1",
                "answer": {
                    "word": "بدن",
                    "language_id": 1
                }
            },
            {
                "id": 312601,
                "parent_id": 41,
                "language_id": 2,
                "season_sort": 2,
                "word": "Foot",
                "status": "1",
                "answer": {
                    "word": "پا",
                    "language_id": 1
                }
            }
        ]);
    })
}


async function init() {
    basic_events();
    socket.emit("season_list", 1, res => {
        season_list[1] = res.data;
        res.data.forEach(s => {
            socket.emit("word_season", s.id, 1, words => {
                word_list[s.id] = words.data;
            })
        });
    });

    socket.emit("season_list", 2, res => {
        season_list[2] = res.data;
        res.data.forEach(s => {
            socket.emit("word_season", s.id, 1, words => {
                // console.log(words)
                word_list[s.id] = words.data;
            })
        });
    });
    socket.emit("season_list", 3, res => {
        season_list[3] = res.data;
        res.data.forEach(s => {
            socket.emit("word_season", s.id, 1, words => {
                word_list[s.id] = words.data;
            })
        });
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
}