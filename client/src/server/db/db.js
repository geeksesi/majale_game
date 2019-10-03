import { store_user, user_set, user_get, get_user_level, set_user_level } from './User';
import { finished_season_get, store_finished_season } from './FinishedSeason';
import { finished_word_get, store_finished_word } from './FinishedWord';
import { remembers_get, store_remembers, restart_remembers } from './Remembers';
import { leaderboard_set } from './Leaderboard';


function restart_data() {
	user_set(parseInt(localStorage.getItem('rubicka_id')), res => { 'Restart Done'; });
	store_finished_season([]);
	store_finished_word({});
	restart_remembers();
	set_user_level(1);
}

export {
	store_user, user_set, user_get,
	finished_season_get, store_finished_season,
	finished_word_get, store_finished_word,
	remembers_get, store_remembers,
	restart_data,
	leaderboard_set,
	get_user_level, set_user_level
};