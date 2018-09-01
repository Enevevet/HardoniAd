exports.run = (client, message, args) => {

	//Regardez le ban.js c'est pareil (juste la 29° ligne qui change !)
	if (message.author.id != `329669021043523594` && message.author.id != `362673558889037825` /* `376812375795302402`*/) return message.channel.send(`${client.em.e} Tu n'as pas les permissions suffisantes !`);
	guildmemb = client.guilds.get(`463980349614194698`).members.get(message.author.id);
	if (guildmemb === undefined || (!guildmemb.roles.get(`470883987074711553`))) {
		message.channel.send(`${client.em.e} Tu n'as pas les permissions suffisantes !`);
		return;
	}
	if (!message.mentions.users.first()) {
		message.react(`❌`);
		return message.channel.send(`${client.em.e} Mentionne quelqu'un par contre...`);
	};
	var user = message.mentions.users.first().id;

	if (!client.banned.has(user)) {
		message.channel.send(`${client.em.e} Mais wtf ? Il est pas ban lui !`);
		return message.react(`❌`);
	}
	//On supprime l'user de la bdd des bans
	else client.banned.delete(user);
	message.react(`✅`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`ub`,`pardon`],
};

exports.help = {
	name: `unban`,
	description: `Unban is not life`,
	usage: `unban <utilisateur>`,
	module: `moderation`,
	emoji: `<:banhammer:474618067553484810>`
};