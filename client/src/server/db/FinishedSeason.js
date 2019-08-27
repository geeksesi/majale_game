/* eslint-disable no-async-promise-executor */

function store_finished_season(finished_season) {
	const tmp = { item: finished_season };
	localStorage.setItem('finished_season', JSON.stringify(tmp));
}

function finished_season_get() {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('finished_season') === null) {
			resolve([]);
		} else {
			const tmp = JSON.parse(localStorage.getItem('finished_season'));
			resolve(tmp.item);
		}
	});
}




export {
	finished_season_get,
	store_finished_season
};