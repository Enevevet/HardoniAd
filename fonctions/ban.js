//Pour manipuler les dates, c'est la base :
const moment = require(`moment`);
moment.locale(`fr`);

exports.run = (client, user, raison) => {

	//On chope la date ou le ban est réalisé
	let curdate = new Date;
	//On la met sous le bon format (dimanche 2 avril 1954, 20:45:32)
	let cdf = moment(curdate).format(`dddd Do MMMM YYYY, HH:mm:ss`);
	//On met la première lettre du string en manjuscule (Dimanche 2 avril 1954, 20:45:32)
	var cdfc = cdf.substring(0, 1).toLocaleUpperCase() + cdf.substring(1);
	//On retient que l'id de l'user (enmap n'accepte que des nombre ou string pas des objets)
	user = user.id;

	//On vérifie quand même que l'utilisateur n'est pas déjà banni
	if (!client.banned.has(user)) {
		//On enregistre alors l'utilisateur, la raison du ban et la date (ça servira beaucoup pour le baninfo.js)
		client.banned.set(user, {
			reason: raison,
			date: cdfc
		});
	}
	//Sinon  bah on va le log pour être au courant quoi xD
	else console.log(`<@${user} déjà banni`);
};
