const gameanalytics = require('gameanalytics');
function GA_init() {
    gameanalytics.GameAnalytics.setEnabledInfoLog(true);
    gameanalytics.GameAnalytics.setEnabledVerboseLog(true);
    gameanalytics.GameAnalytics.configureBuild("majale 0.8.0");
    // gameanalytics.GameAnalytics.configureUserId("user1234567879");
    gameanalytics.GameAnalytics.configureAvailableResourceCurrencies(["coin"]);

    gameanalytics.GameAnalytics.initialize("a39c65b50ab7df6c088886f790e89fb9", "8527d736b4ff47fb7370fa4adcf6aae5b846d7ee");
}


function start_level(season_id, word_id) {
    gameanalytics.GameAnalytics.addProgressionEvent(gameanalytics.EGAProgressionStatus.Start, season_id, word_id);
}

function finish_level(season_id, word_id, xp) {
    gameanalytics.GameAnalytics.addProgressionEvent(gameanalytics.EGAProgressionStatus.Complete, season_id, word_id, "", xp);
    gameanalytics.GameAnalytics.addResourceEvent(gameanalytics.EGAResourceFlowType.Sink, "coin", (xp * 3), "finish_level", word_id);
}

function use_hint(word_id) {
    gameanalytics.GameAnalytics.addResourceEvent(gameanalytics.EGAResourceFlowType.Sink, "coin", -10, "hint", word_id);
}

export {
    GA_init,
    start_level,
    finish_level,
    use_hint
}