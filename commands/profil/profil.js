//Pour les thèmes
const colorFile = require(`../../extra_modules/colorFile`);
//Les embeds ahlàlà
const Discord = require(`discord.js`);
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
	var m = client.profiles.getProp(u, `msg`);
	var xp = client.profiles.getProp(u, `xp`);
	var lvl = client.profiles.getProp(u, `level`);
	var vip = client.profiles.getProp(u, `vip`);
	var theme = client.profiles.getProp(u, `theme`);
	var banned = client.banned.has(u);
	var colo = colorFile[theme];

	//Petit fantasme des emojis
	var u = vip === true ? client.em.d : client.em.e;
	var w = banned === true ? client.em.d : client.em.e;

	//On déclare l'embed du profil
	var e = new Discord.MessageEmbed()
		.setTitle(`__**Profil de ${user.username}**__`)
		.setTimestamp()
		.addField(`Niveau`, lvl)
		.addField(`Pubs`, m, true)
		.addField(`Points`, xp, true)
		.addField(`VIP`, u, true)
		.addField(`Banni`, w, true)
		.setColor(colo)
		.setThumbnail(user.avatarURL(`png`, `64`))
		.setFooter(`HardoniAd by Enevevet#2020`);
	//Et pouf on l'envoie !
	message.channel.send(e);


	//Canvas coming soon...
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`pr`, `me`, `profile`],
};

exports.help = {
	name: `profil`,
	description: `Montrer votre profil`,
	usage: `profil [utilisateur]`,
	module: `profil`,
	emoji: `<:profil:484980168943992844>`
};