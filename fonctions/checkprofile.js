module.exports = (client, user) => {

	if (!client.profiles.has(user)) {
		client.profiles.set(user, {
			msg: 0,
			xp: 0,
			level: 1,
			vip: false,
			theme: `default`
		});
	}
	else return;
};