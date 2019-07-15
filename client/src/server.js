const io = require("socket.io-client");
const socket = io();

let season_list = {};

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


function init() {
    basic_events();
    socket.emit("season_list", 1, res => { season_list[1] = res.data });
    socket.emit("season_list", 2, res => { season_list[2] = res.data });
    socket.emit("season_list", 3, res => { season_list[3] = res.data });
    // setTimeout(async ()=> console.log(await get_season(2)), 2000)
    
}

module.exports = {
    init,
    get_season,
}