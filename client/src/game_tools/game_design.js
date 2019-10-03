/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
	set_user_level,
	get_user_level,
	splice_word,
	get_finished_word,
	store_finished_season,
	store_finished_word
} from './../server';


function chance_to_add(cb) {
	const chances = [1, 0, 0, 0, 1, 1, 0];
	cb(chances[Math.floor(Math.random() * chances.length)]);
}
function chance_to_test(cb) {
	const chances = [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
	cb(chances[Math.floor(Math.random() * chances.length)]);
}


async function make_road(level, words, finished_word, remembers, language_id, cb) {
	let new_words = [];
	let remembers_word = [];
	let check_finish = false;
	words.every(async word => {
		if (new_words.length > 7) {
			if (remembers_word.length === remembers.length || remembers_word.length > 9) {
				check_finish = true;
				return true;
			}
		}
		if (typeof finished_word[word.id] === 'undefined' && word.language_id === language_id) {
			if (typeof word.answer !== 'undefined' && word.answer.word.length < 12 && word.status == level)
				chance_to_add(yes_or_not => {
					if (yes_or_not)
						new_words.push(word);
				});
			else
				splice_word(word.season_id, word.id);
		} else {
			if (remembers.includes(word.id) && word.language_id === language_id) {
				if (typeof word.answer !== 'undefined' && word.answer.word.length < 12)
					await remembers_word.push(word);
				else
					splice_word(word.season_id, word.id);
			}
		}
	});

	setTimeout(() => {
		check_finish = true;
	}, 2000);
	let wait_for_him = setInterval(async () => {
		if (check_finish) {
			clearInterval(wait_for_him);
			// console.log(await make_final_road(new_words, remembers_word))
			let road = await make_final_road(new_words, remembers_word);
			setTimeout(() => {
				cb(road);
			}, 500);
		}
	}, 500);

}

function make_final_road(new_words, remembers) {
	return new Promise(async (resolve, reject) => {
		let road = [];
		if (new_words.length <= 4) {
			road = await [
				...new_words,
				...remembers
			];
		} else if (remembers.length <= 4) {
			road = await [
				...remembers,
				...new_words,
			];
		} else {
			await road.push(remembers[0], remembers[1], remembers[2], remembers[3], ...new_words);
		}
		if (road.length > 8) {
			await road.splice(8, (road.length - 8));
		}
		resolve(road);
	});
}


function user_level(cb) {
	get_finished_word(res => {
		const season_id = parseInt(Object.keys(res).length / 8) + 1;
		const length = 8;
		const completed = parseInt(Object.keys(res).length % 8);
		cb({
			ok: true,
			season_id: season_id,
			length: length,
			completed: completed,
		});
	});
}


function make_test(level, word_list, language_id, cb, old = []) {
	let new_words = [...old];
	let check_finish = false;
	word_list.every(async word => {
		if (new_words.length > 9) {
			check_finish = true;
			return true;

		}
		if (word.language_id === language_id) {
			if (typeof word.answer !== 'undefined' && word.answer.word.length < 12 && word.status == level)
				chance_to_test(yes_or_not => {
					if (yes_or_not)
						new_words.push(word);
				});
			else
				splice_word(word.season_id, word.id);
		} else {
			// Do Nothing
		}
	});

	setTimeout(() => {
		check_finish = true;
	}, 2000);

	let wait_for_him = setInterval(async () => {
		if (check_finish) {
			clearInterval(wait_for_him);
			if (new_words.length < 10)
				make_test(level, word_list, language_id, res => {
					cb(res);
				}, new_words);
			else
				setTimeout(() => {
					cb(new_words);
				}, 500);
		}
	}, 500);
}


async function lvlup_user() {
	const user_level = await get_user_level();
	if (user_level > 3) {
		console.log('all of level has finished');
	} else {
		console.log('level growed ');
		set_user_level(user_level + 1);
		store_finished_season([]);
		store_finished_word({});
	}
}

export { make_road, user_level, make_test, lvlup_user };