const gameanalytics = require('gameanalytics');
function GA_init() {
	gameanalytics.GameAnalytics.setEnabledInfoLog(false);
	gameanalytics.GameAnalytics.setEnabledVerboseLog(false);
	gameanalytics.GameAnalytics.configureBuild('majale 0.10.0');
	gameanalytics.GameAnalytics.configureAvailableResourceCurrencies(['coin']);
	gameanalytics.GameAnalytics.configureAvailableResourceItemTypes(['finish_level', 'hint']);
	gameanalytics.GameAnalytics.initialize('a39c65b50ab7df6c088886f790e89fb9', '8527d736b4ff47fb7370fa4adcf6aae5b846d7ee');
}


function GA_start_level(season_id, word_id) {
	gameanalytics.GameAnalytics.addProgressionEvent(gameanalytics.EGAProgressionStatus.Start, season_id, word_id);
}

function GA_finish_level(season_id, word_id, xp) {
	gameanalytics.GameAnalytics.addProgressionEvent(gameanalytics.EGAProgressionStatus.Complete, season_id, word_id, '', xp);
	gameanalytics.GameAnalytics.addResourceEvent(gameanalytics.EGAResourceFlowType.Sink, 'coin', (xp * 3), 'finish_level', word_id);
}
function GA_finish_season(season_id) {
	gameanalytics.GameAnalytics.addProgressionEvent(gameanalytics.EGAProgressionStatus.Complete, season_id);
}

function GA_use_hint(word_id) {
	gameanalytics.GameAnalytics.addResourceEvent(gameanalytics.EGAResourceFlowType.Sink, 'coin', 10, 'hint', word_id);
}

function set_user_id(user_id){
	gameanalytics.GameAnalytics.configureUserId(user_id);
}

export {
	GA_init,
	GA_start_level,
	GA_finish_level,
	GA_use_hint,
	GA_finish_season,
	set_user_id,
};