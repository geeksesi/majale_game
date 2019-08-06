async function make_road(words, finished_word, remembers, language_id, cb) {

    let new_words = [];
    let remembers_word = [];
    let check_finish = false;
    await Object.keys(words).forEach(word_key => {
        words[word_key].every(async word => {
            if (new_words.length > 7) {
                if (remembers_word.length === remembers.length || remembers_word.length > 9) {
                    check_finish = true;
                    return true;
                }
            }
            if (typeof finished_word[word.id] === 'undefined' && word.language_id === language_id) {
                await new_words.push(word);
            } else {
                if (remembers.includes(word.id) && word.language_id === language_id) {
                    await remembers_word.push(word);
                }
            }
        })
    })
    setTimeout(() => {
        check_finish = true;
    }, 2000)
    let wait_for_him = setInterval(async() => {
        if (check_finish) {
            clearInterval(wait_for_him);
            // console.log(await make_final_road(new_words, remembers_word))
            let road = await make_final_road(new_words, remembers_word)
            setTimeout(() => {
                cb(road)
            }, 500)
        }
    }, 500)

}

function make_final_road(new_words, remembers) {
    return new Promise(async(resolve, reject) => {
        let road = [];
        if (new_words.length <= 4) {
            road = await [
                ...new_words,
                ...remembers
            ]
        } else if (remembers.length <= 4) {
            road = await [
                ...remembers,
                ...new_words,
            ]
        } else {
            await road.push(remembers[0], remembers[1], remembers[2], remembers[3], ...new_words);
        }
        if (road.length > 8) {
            await road.splice(8, (road.length - 8))
        }
        resolve(road)
    })
}

function user_path(words, last_finished_word_key, remembers, language_id, season, cb) {
    let output = {
        remember_length : remembers.length,
        season_id : 0,
        season_name : "",
        season_length : 0,
        season_finished_length : 0,
    }

    Object.keys(words).forEach(key => {
        words[key].forEach(word => {
            if (word.id === last_finished_word_key) {
                season_id = key;
                season_length = words[key].length;
                if (word.season_sort < words[key].length) {
                    output.season_id = key;
                    output.season_length = words[key].length;
                    output.season_finished_length = word.season_sort;
                    console.log(output.season_id)
                } else {
                    if (typeof words[key + 1] !== 'undefined') {
                        output.season_id = key+1;
                        output.season_length = words[key+1].length;
                        output.season_finished_length = 1;
                        console.log(output.season_id)
                    } else {
                        cb({ ok: false })
                    }
                }
            }
        });
    });

    let wait_for_season_id = setInterval(() => {
        if (output.season_id !== 0) {
            clearInterval(wait_for_season_id);
            season_info(output.season_id, season, language_id, name => {
                output.season_name = name;
                setTimeout(() => {
                    cb(output);
                }, 200)
            })
        }
    }, 500);

}


function season_info(season_id, season, language_id, cb) {
    season[language_id].forEach(season => {
        if (season.id === season_id) {
            cb(season.name)
        }
    })
}

export { make_road, user_path };