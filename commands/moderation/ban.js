const ban = require(`../../fonctions/ban.js`);

exports.run = (client, message, args) => {

	var user;
	var raison = args.slice(1).join(` `);
	//Merci les users
	message.mentions.users.first() ? user = message.mentions.users.first() : user = client.users.get(args[0]);
	//Si le mec qui ban est même pas sur le serveur de support
	guildmemb = client.guilds.get(`463980349614194698`).members.get(message.author.id);
	if (guildmemb === undefined) {
		message.channel.send(`<:facepalm:474618049828356137> Nope...`);
		//On me prévient
		client.fetchUser(`329669021043523594`)
			.then((Nvv) => {
				Nvv.send(`__**<@${message.author.id}> vient de tenter un ban :**__ \nServeur : ${message.guild} (${message.guild.id}) , Channel : ${message.channel} (${message.channel.id})\nVictime : ${user.id} ; ${user.username}#${user.discriminator}\nBadBoy : ${message.author.id} ; ${message.author.username}#${message.author.discriminator}`);
			});
		//Et on prévient Paulé !
		client.fetchUser(`376812375795302402`)
			.then((pau) => {
				pau.send(`__**<@${message.author.id}> vient de tenter un ban :**__ \nServeur : ${message.guild} (${message.guild.id}) , Channel : ${message.channel} (${message.channel.id})\nVictime : ${user.id} ; ${user.username}#${user.discriminator}\nBadBoy : ${message.author.id} ; ${message.author.username}#${message.author.discriminator}`);
			});
		return;
	};
	//S'il est modo sur le serveur de support
	if (guildmemb.roles.get(`470883987074711553`)) {
		//Mais qu'il est bête
		if (!message.mentions.users.first()) {
			message.react(`❌`);
			return message.channel.send(`<:facepalm:474618049828356137> Mentionne quelqu'un par contre...`);
		};
		//Voire très bête
		if (client.banned.has(user.id)) return message.channel.send(`Déjà ban celui-là !`);
		//Voire très très bête
		if (!raison) return message.channel.send(`Mets une raison patate !`);
		//Bon bref sinon on bah tout ça
		ban.run(client, user, raison);

		message.channel.send(`Banhammed <@${user.id}> ! <:banhammer:474618067553484810>`);;
	}
	else {
		//Mais i le gars est pas modo : REBELOTTE !
		message.channel.send(`<:facepalm:474618049828356137> Nope...`);
		client.fetchUser(`329669021043523594`)
			.then((Nvv) => {
				Nvv.send(`__**<@${message.author.id}> vient de tenter un ban :**__ \nServeur : ${message.guild} (${message.guild.id}) , Channel : ${message.channel} (${message.channel.id})\nVictime : ${user.id} ; ${user.username}#${user.discriminator}\nBadBoy : ${message.author.id} ; ${message.author.username}#${message.author.discriminator}`);
			});
		client.fetchUser(`376812375795302402`)
			.then((pau) => {
				pau.send(`__**<@${message.author.id}> vient de tenter un ban :**__ \nServeur : ${message.guild} (${message.guild.id}) , Channel : ${message.channel} (${message.channel.id})\nVictime : ${user.id} ; ${user.username}#${user.discriminator}\nBadBoy : ${message.author.id} ; ${message.author.username}#${message.author.discriminator}`);
			});
		return;
	};
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`b`, `bh`, `banhammer`],
};

exports.help = {
	name: `ban`,
	description: `Ban is life`,
	usage: `ban <utilisateur>`,
	module: `moderation`,
	emoji: `<:banhammer:474618067553484810>`
};