const ban = require(`../../fonctions/ban.js`);

exports.run = (client, message, args) => {

	var user;
	var raison = args.slice(1).join(` `);
	//Merci les users
	message.mentions.users.first() ? user = message.mentions.users.first() : user = client.users.get(args[0]);
	//Si le mec qui ban est même pas sur le serveur de support
	guildmemb = client.guilds.get(`463980349614194698`).members.get(message.author.id);
	if (guildmemb === undefined) {
		message.channel.send(`${client.em.e} Tu n'as pas les permissions suffisantes`);
		return;
	};
	//S'il est modo sur le serveur de support
	if (guildmemb.roles.get(`470883987074711553`)) {
		//Mais qu'il est bête
		if (!message.mentions.users.first()) {
			message.react(`❌`);
			return message.channel.send(`${client.em.e} Mentionne quelqu'un par contre...`);
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
		message.channel.send(`${client.em.e} Tu n'as pas les permissions suffisantes !`);
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