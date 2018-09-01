const checkprofile = require("../../fonctions/checkprofile");


exports.run = (client, message, args) => {
	//OK GOOGLE BDJZIVDUZABD JZA
	var user;
	//Tout est marqué madame
	if (!args[0]) user = message.author;
	else if (message.mentions.users.first()) user = message.mentions.users.first();
	else if (message.guild.members.some(m => m.username === args[0])) user = message.guild.members.find(m => m.name === args[0]);
	else if (args[0].match(/(\d{17,19})/g)) {
		user = client.users.find(m => m.id === args[0]);
		if (user === undefined) user = message.author;
	}
	else if (user === undefined) user = message.author;
	//Et ouais tout ça pour ça
	if (user.bot) return message.channel.send(`${client.em.e} Les bots n'ont pas de profil !`)
	var u = user.id;

	//Si il existe pas bah on le crée patate !
	checkprofile(client, u);

	//Sinon on chope tous les élements 
	var xp = client.profiles.getProp(u, `xp`);

	//On déclare l'embed du profil
	message.channel.send(`XPs de <@${u}> : ${xp} <:xp:485458876855222273>`);


	//Canvas coming soon...
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`bal`, `balance`],
};

exports.help = {
	name: `xp`,
	description: `Montrer son nombre d'xp`,
	usage: `xp [utilisateur]`,
	module: `profil`,
	emoji: `<:xp:485458876855222273>`
};