const checkprofile = require("../../fonctions/checkprofile");
const Discord = require('discord.js')

exports.run = (client, message, args) => {
	//OK GOOGLE BDJZIVDUZABD JZA
	if(!args[0]) var user = message.author;
	if(args[0]) var user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase() === args[0].toLowerCase()) || message.author;
	if (user instanceof Discord.GuildMember) user = user.user;
	if (user.bot) return message.channel.send(`${client.em.e} Les bots n'ont pas de profil !`)
	var u = user.id;

	//Si il existe pas bah on le crée patate !
	checkprofile(client, u);

	//Sinon on chope tous les élements 
	var xp = client.profiles.getProp(u, `xp`);

	//On déclare l'embed du profil
	message.channel.send(`XPs de ${user.tag} : ${xp} <:xp:485458876855222273>`);


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