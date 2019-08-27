/* eslint-disable no-async-promise-executor */

async function store_remembers(remembers) {
	const old_remember = await remembers_get();
	const tmp = {
		item: [
			...old_remember,
			...remembers
		]
	};
	localStorage.setItem('remembers', JSON.stringify(tmp));
}


function remembers_get() {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('remembers') === null) {
			resolve([]);
		} else {
			const tmp = JSON.parse(localStorage.getItem('remembers'));
			resolve(tmp.item);
		}
	});
}

function restart_remembers() {
	localStorage.setItem('remembers', JSON.stringify({
		item: []
	}));

}

export {
	remembers_get,
	store_remembers,
	restart_remembers
};