function leaderboard_set(rubicka_id, xp, name = null, avatar = null, cb) {
	fetch(`https://majaleleaderboard.liara.run/leaderboard/${rubicka_id}`, {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},

		//make sure to serialize your JSON body
		body: JSON.stringify({
			xp: xp,
			name: name,
			avatar: avatar
		})
	})
		.then(async (res) => {
			const data = await res.json();
			cb(data);
		}).catch(e => cb({ ok: false, e: e }));
}

export {
	leaderboard_set
};