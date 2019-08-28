/* eslint-disable no-async-promise-executor */
/* eslint-disable require-atomic-updates */
import { set_user_id, GA_init } from './GA';
import {
	server_init,
	store_user,
	store_finished_season,
	store_finished_word,
	store_remembers,
	restart_data,
	leaderboard_set
} from './server/server';

let rubicka_id = localStorage.getItem('rubicka_id');
let season_list = {};
let word_list = {};
let user = {};
let finished_word = {};
let remembers_word = [];
let finished_season = [];
let finish_init = false;

function connection_check() {
	init();
}

function loading_finished(cb) {
	const wait_for_init = setInterval(() => {
		if (finish_init) {
			clearInterval(wait_for_init);
			cb(true);
		}
	}, 500);
}

function get_season(language_id) {
	return new Promise((res, _rej) => {
		res(season_list[language_id]);
	});
}


function user_data() {
	return new Promise((res, _rej) => {
		res(user);

	});
}

function get_word(season_id) {
	return new Promise((res, _rej) => {
		res(word_list[season_id]);
	});
}

function get_finished_season(cb) {
	cb(finished_season);
}

function get_finished_word(cb) {
	cb(finished_word);
}

function play_game_data() {
	return new Promise((resolve, _reject) => {
		resolve({
			finished_word: finished_word,
			remembers_word: remembers_word,
			word_list: word_list
		});
	});
}


function use_hint(word_id) {
	setTimeout(() => {
		store_user(user);
	}, 500);
	return new Promise((resolve, reject) => {
		user.credit -= 10;
		resolve(true);
	});
}

function finish_level(word_id, season_id, time, is_hint, status, cb) {
	let xp_value = 0;
	if (time <= 5) {
		xp_value = 3;
	} else if (time <= 10) {
		xp_value = 2;
	} else {
		xp_value = 1;
	}
	let prize_value = xp_value * 5 * status;
	user.credit += prize_value;
	finished_word[word_id] = xp_value;
	user.xp += xp_value;
	if (is_hint) {
		remembers_word.push(word_id);
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
	setTimeout(() => {
		store_user(user);
		store_remembers(remembers_word);
		store_finished_word(finished_word);
	}, 1000);
	check_season_finished(season_id, season_status => {
		cb({
			ok: true,
			prize: prize_value,
			xp: xp_value,
			season_status: season_status
		});
	});
}

async function init() {
	server_init((res) => {
		rubicka_id = localStorage.getItem('rubicka_id');
		season_list = res.season_list;
		word_list = res.word_list;
		user = res.user;
		finished_season.push(...res.finished_season);
		remembers_word.push(...res.remembers_id);
		finished_word = res.finished_word;
		console.log(res);
		setTimeout(() => {
			set_user_id(user.rubicka_id);
			GA_init();
			finish_init = true;
			loaded_finished();
		}, 1000);
	});

}

function season_finish(season_id) {
	finished_season.push(season_id);
	setTimeout(() => {
		store_finished_season(finished_season);
	}, 200);
}

function season_finish_data(season_id) {
	return new Promise(async (res, _rej) => {
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
				};
				await usefull_array.push(tmp_obj);
			});
		}
		let wait = setInterval(() => {
			if (usefull_array.length === this_words.length) {
				clearInterval(wait);
				res(usefull_array);
			}
		}, 500);
	});

}

async function check_season_finished(season_id, cb) {
	if (Object.keys(finished_word).length % 8 === 0) {
		season_finish(parseInt(Object.keys(finished_word).length / 8));
		setTimeout(() => {
			cb(true);
		}, 500);
	} else {
		setTimeout(() => {
			cb(false);
		}, 500);
	}

	// let wait_for_it;
	// if (finished_season.indexOf(season_id) !== -1) {
	// 	cb(false);
	// 	return false;
	// }
	// let season_data = await season_finish_data(season_id);
	// let ok = [];
	// for (let i = 0; i < season_data.length; i++) {
	// 	const element = season_data[i];
	// 	if (element.status === null || typeof element.status === 'undefined' || element.status === 0) {
	// 		if (typeof wait_for_it !== 'undefined') {
	// 			clearInterval(wait_for_it);
	// 		}
	// 		cb(false);
	// 		return false;
	// 	} else {
	// 		ok.push(true);
	// 	}
	// }

	// wait_for_it = setInterval(() => {
	// 	if (ok.length === season_data.length) {
	// 		clearInterval(wait_for_it);
	// 		finished_season.push(season_id);
	// 		season_finish(season_id, _res => {
	// 			cb(true);
	// 		});
	// 	}
	// }, 500);
}


function loaded_finished() {
	console.log('finish');
}

function leader_board(cb) {
	leaderboard_set(rubicka_id, user.xp, null, null, res => {
		if (res.ok === true)
			cb(res);
		else
			cb(false);
	});
	// socket.emit('leaderBoard', (res) => {
	// 	if (res.ok === true) {
	// 		// console.log(res)
	// 		cb(res);
	// 	} else {
	// 		console.log(res);
	// 		cb(false);
	// 	}
	// });
}

function splice_word(season_id, word_id) {
	for (var i = 0; i < word_list[season_id].length; i++) {
		if (word_list[season_id][i].id === word_id) {
			word_list[season_id].splice(i, 1);
		}
	}
}


function change_user_detail(user_update, cb) {
	leaderboard_set(rubicka_id, user.xp, user_update.name, user_update.av_name, res => {
		console.log(res);
		if (res.ok === true) {
			user.name = user_update.name;
			user.avatar = user_update.av_name;
			setTimeout(() => {
				store_user(user);
			}, 200);
			cb(true);
		}
		else {
			cb(false);
		}
	});
}


function user_data_restart() {
	restart_data();
}

export {
	loading_finished,
	get_season,
	get_word,
	user_data,
	use_hint,
	finish_level,
	play_game_data,
	season_finish,
	season_finish_data,
	check_season_finished,
	leader_board,
	get_finished_season,
	splice_word,
	change_user_detail,
	connection_check,
	user_data_restart,
	get_finished_word,
};