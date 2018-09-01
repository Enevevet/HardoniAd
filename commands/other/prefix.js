exports.run = (client, message, args) => {
	if (!client.prefixes.has(message.guild.id)) {
		client.prefixes.set(message.guild.id, `=`);
	};
	let curpref = client.prefixes.get(message.guild.id);
	if (!args[0]) return message.channel.send(`Mon préfix sur ce serveur est ${curpref} !\nPour le modifier, effectuez \`${curpref}prefix <votreNouveauPrefix>\``);
	if (!message.member.hasPermission(`MANAGE_SERVER`)) return message.channel.send(`Vous avez besoin de la permssion \`MANAGE_MESSAGES\` pour changer le préfix !`)
	let newprefix = args.join(` `);

	client.prefixes.set(message.guild.id, newprefix);
	message.channel.send(`Le prefix a été changé sur : \`${newprefix}\``);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`pref`, `newprefix`, `setprefix`],
};

exports.help = {
	name: `prefix`,
	description: `Montrer/Redéfinir le préfix du bot sur ce serveur`,
	usage: `prefix [nouveauPrefix]`,
	module: `other`,
	emoji: `<:prefix:484979135085805568>`
};