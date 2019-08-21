import { season_finish_data, get_finished_season, splice_word } from './../server';

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
                if (typeof word.answer !== 'undefined' && word.answer.word.length < 12)
                    await new_words.push(word);
                else
                    splice_word(word.season_id, word.id)
            } else {
                if (remembers.includes(word.id) && word.language_id === language_id) {
                    if (typeof word.answer !== 'undefined' && word.answer.word.length < 12)
                        await remembers_word.push(word);
                    else
                        splice_word(word.season_id, word.id)
                }
            }
        })
    })
    setTimeout(() => {
        check_finish = true;
    }, 2000)
    let wait_for_him = setInterval(async () => {
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
    return new Promise(async (resolve, reject) => {
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

function user_level(cb) {
    get_finished_season(async seasons_id => {
        if (seasons_id.length < 1) {
            let finish = false;
            let completed = 0;
            let season_data = await season_finish_data(1);
            for (let i = 0; i < season_data.length; i++) {
                if (typeof season_data[i].status === 'undefined') {
                    finish = true;
                    break;
                } else {
                    completed++;
                }
                if (typeof season_data[i + 1] === 'undefined') {
                    finish = true;
                }
            }
            const wait_interval = setInterval(() => {
                if (finish) {
                    clearInterval(wait_interval);
                    cb({
                        ok: true,
                        season_id: 1,
                        length: season_data.length,
                        completed: completed,
                    })
                }
            }, 200)
        }
        else {
            let season_id = await seasons_id[seasons_id.length - 1] + 1;
            let finish = false;
            let completed = 0;
            let season_data = await season_finish_data(season_id);
            for (let i = 0; i < season_data.length; i++) {
                if (typeof season_data[i].status === 'undefined') {
                    finish = true;
                    break;
                } else {
                    completed++;
                }
                if (typeof season_data[i + 1] === 'undefined') {
                    finish = true;
                }
            }
            const wait_interval = setInterval(() => {
                if (finish) {
                    clearInterval(wait_interval);
                    cb({
                        ok: true,
                        season_id: season_id,
                        length: season_data.length,
                        completed: completed,
                    })
                }
            }, 200)

        }
    })
}

export { make_road, user_level };