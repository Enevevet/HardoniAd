exports.run = (client, message, args) => {

	//Regardez le ban.js c'est pareil (juste la 29° ligne qui change !)
	if (message.author.id != `329669021043523594` && message.author.id != `362673558889037825` /* `376812375795302402`*/) return message.channel.send(`${client.em.e} Nope...`);
	guildmemb = client.guilds.get(`463980349614194698`).members.get(message.author.id);
	if (guildmemb === undefined || (!guildmemb.roles.get(`470883987074711553`))) {
		message.channel.send(`${client.em.e} Nope...`);
		client.fetchUser(`329669021043523594`)
			.then((Nvv) => {
				Nvv.send(`__**<@${message.author.id}> vient de tenter un unban :**__ \nServeur : ${message.guild} (${message.guild.id}) , Channel : ${message.channel} (${message.channel.id})\nVictime : ${user.id} ; ${user.username}#${user.discriminator}\nBadBoy : ${message.author.id} ; ${message.author.username}#${message.author.discriminator}`);
			});
		client.fetchUser(`376812375795302402`)
			.then((pau) => {
				pau.send(`__**<@${message.author.id}> vient de tenter un unban :**__ \nServeur : ${message.guild} (${message.guild.id}) , Channel : ${message.channel} (${message.channel.id})\nVictime : ${user.id} ; ${user.username}#${user.discriminator}\nBadBoy : ${message.author.id} ; ${message.author.username}#${message.author.discriminator}`);
			});
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
	aliases: [`ub`],
};

exports.help = {
	name: `unban`,
	description: `Unban is not life`,
	usage: `unban <utilisateur>`,
	module: `moderation`,
	emoji: `<:banhammer:474618067553484810>`
};