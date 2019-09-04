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

function get_user_level() {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('user_level') === null) {
			resolve(null);
		} else {
			const tmp = JSON.parse(localStorage.getItem('user_level'));
			resolve(parseInt(tmp));
		}
	});
}

function set_user_level(level) {
	if (typeof level === typeof 1)
		localStorage.setItem('user_level', level);
	else
		return false;
}


export {
	user_set,
	user_get,
	store_user,
	get_user_level,
	set_user_level,
};