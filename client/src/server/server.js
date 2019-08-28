import {
	store_user, user_set, user_get,
	finished_season_get, store_finished_season,
	finished_word_get, store_finished_word,
	remembers_get, store_remembers,
	restart_data,
	leaderboard_set
} from './db/db';

async function server_init(cb) {
	const update_time = parseInt(localStorage.getItem('update_time')) || 0;
	console.log(update_time);
	fetch(`https://majaleleaderboard.liara.run/time/${update_time}`)
		.then(async res => {
			const data = await res.json();
			let user;
			if (data.message === 'need update') {
				// console.log(data.season_list);
				localStorage.setItem('WordList', JSON.stringify(data.word_list));
				localStorage.setItem('SeasonList', JSON.stringify(data.season_list));
				if (update_time === 0) {
					user_set(localStorage.getItem('rubicka_id'), res => {
						localStorage.setItem('update_time', Math.floor(Date.now() / 1000));
						user = res;
						cb({
							word_list: data.word_list,
							season_list: data.season_list,
							user: user,
							finished_season: [],
							remembers_id: [],
							finished_word: {},
						});
					});
				}
				else {
					setTimeout(async () => {
						localStorage.setItem('update_time', Math.floor(Date.now() / 1000));
						const word_list = JSON.parse(localStorage.getItem('WordList'));
						const season_list = JSON.parse(localStorage.getItem('SeasonList'));
						const user = await user_get();
						const finished_season = await finished_season_get();
						const remembers_id = await remembers_get();
						const finished_word = await finished_word_get();
						cb({
							word_list: word_list,
							season_list: season_list,
							user: user,
							finished_season: finished_season,
							remembers_id: remembers_id,
							finished_word: finished_word,
						});
					}, 1000);
				}
				// const user = await user_get();
			} else {
				const word_list = JSON.parse(localStorage.getItem('WordList'));
				const season_list = JSON.parse(localStorage.getItem('SeasonList'));
				const user = await user_get();
				const finished_season = await finished_season_get();
				const remembers_id = await remembers_get();
				const finished_word = await finished_word_get();
				cb({
					word_list: word_list,
					season_list: season_list,
					user: user,
					finished_season: finished_season,
					remembers_id: remembers_id,
					finished_word: finished_word,
				});
			}
		});
}

export {
	server_init,
	store_user,
	store_finished_season,
	store_finished_word,
	store_remembers,
	restart_data,
	leaderboard_set
};