/* eslint-disable no-async-promise-executor */

function user_set(rubicka_id, cb) {
	const data = {
		id: 1,
		rubicka_id: rubicka_id,
		name: null,
		avatar: null,
		credit: 50,
		xp: 0,
	};

	localStorage.setItem('User', JSON.stringify(data));
	cb(data);
}

function store_user(user) {
	localStorage.setItem('User', JSON.stringify(user));
}

function user_get() {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('User') === null) {
			user_set(parseInt(localStorage.getItem('rubicka_id')), res => {
				resolve(res);
			});
		} else {
			resolve(JSON.parse(localStorage.getItem('User')));
		}
	});
}




export {
	user_set,
	user_get,
	store_user
};