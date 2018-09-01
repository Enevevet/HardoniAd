module.exports = (client, user) => {
	//TOUJOURS L'ID DE L'USER DANS LES DATABASES !
	var user = user.id;

	//Si c'est un newbie...
	if (!client.profiles.has(user)) {
		//... On lui crée tout ! (Avec 25 xp quand même :p)
		client.profiles.set(user, {
			msg: 1,
			xp: 25,
			level: 1,
			vip: false,
			theme: `default`
		});
	}
	//Sinon :
	else {
		//On prend les xps actuels
		let curxp = client.profiles.getProp(user, `xp`);
		//On leurs ajoute un nombre random entre 15 et 25
		let newxp = curxp + Math.floor(Math.random() * (25 - 15 + 1)) + 15;
		//On chope le nombre de messages (de pub)
		let curmg = client.profiles.getProp(user, `msg`);
		//On eur en ajoute un
		let newmg = curmg + 1;
		//On enregistre les xps
		client.profiles.setProp(user, `xp`, newxp);
		//Et les messages !
		client.profiles.setProp(user, `msg`, newmg);
		//Maintenant on calcule le niveau grâce aux xps
		let nwlvl = Math.floor(Math.sqrt(newxp) * 0.1 + 1);
		//Et on l'enregistre !
		client.profiles.setProp(user, `level`, nwlvl);
	};
};