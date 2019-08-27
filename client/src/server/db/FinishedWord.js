/* eslint-disable no-async-promise-executor */

function store_finished_word(finished_word) {
	localStorage.setItem('finished_word', JSON.stringify(finished_word));
}

function finished_word_get() {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('finished_word') === null) {
			resolve({});
		} else {
			const tmp = JSON.parse(localStorage.getItem('finished_word'));
			resolve(tmp);
		}
	});
}




export {
	finished_word_get,
	store_finished_word
};