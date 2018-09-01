exports.run = (client, message, args) => {

	//On définit le chenapan
	var user;
	message.mentions.users.first() ? user = message.mentions.users.first() : user = client.users.get(args[0]);
	if (!user) user = message.author;
	var ui = user.id;

	//S'il n'est pas ban on rekt
	if (!client.banned.has(ui) && user === message.author) return message.channel.send(`${client.em.d} Tu n'es pas banni !`);
	else if (!client.banned.has(ui)) return message.channel.send(`${client.em.e} Cet utilisateur n'est pas ban`);

	//Sinon on chope les infos
	let r = client.banned.getProp(ui, `reason`);
	let d = client.banned.getProp(ui, `date`);
	//Et on leak tout ça !
	message.channel.send(`\`\`\`http\n User  :: ${user.tag} (${user.id})\nRaison :: ${r}\n Date  :: ${d}\`\`\``);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`bi`, `bancard`, `bc`, `case`],
};

exports.help = {
	name: `baninfo`,
	description: `Montrer les information d'un ban`,
	usage: `baninfo <utilisateurBanni>`,
	module: `moderation`,
	emoji: `<:read_the_docs:468339181568000020>`
};