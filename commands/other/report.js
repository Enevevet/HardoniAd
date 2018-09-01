exports.run = (client, message, args) => {

	//S'il veulent juste report pour le fun...
	if (!args[0]) return message.channel.send(`${client.em.e} Tu ne peux pas report du vent...\nUtilisation de la commande : \`report <idDeLaPersonne> <Votre Signalement>\``);
	let id = args[0];

	//On cherche dans les users que connait le bot le méchant
	client.fetchUser(id)
		.then((User) => {
			//Si le méchant existe
			args.shift();
			args = args.join(` `);
			//On me recherche (enevevet)
			client.fetchUser(`329669021043523594`)
				//On me l'envoie mp
				.then((Nvv) => {
					Nvv.send(`__**Signalement de <@${User.id}> par <@${message.author.id}>:**__ \`\`\`js\n${args}\`\`\`\n\n__Infos supplémentaires :__ ${id} ; ${User.username}#${User.discriminator} ; ${message.author.id} ; ${message.author.username}#${message.author.discriminator}`);
				});
			//Et on fait de même à Paulé
			client.fetchUser(`376812375795302402`)
				.then((pau) => {
					pau.send(`__**Signalement de <@${User.id}> par <@${message.author.id}>:**__ \`\`\`js\n${args}\`\`\`\n\n__Infos supplémentaires :__ ${id} ; ${User.username}#${User.discriminator} ; ${message.author.id} ; ${message.author.username}#${message.author.discriminator}`);
				});
		})
		.catch((err) => { //Si l'id est invalide
			console.log(err);
			message.channel.send(`${client.em.e} Désolé mais cet id est invalide...\nUtilisation de la commande : \`=report <idDeLaPersonne> <Votre Signalement>\``);
		});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`re`],
};

exports.help = {
	name: `report`,
	description: `Signaler une personne.`,
	usage: `report <idDeLaPersonne> <Votre Signalement>`,
	module: `other`,
	emoji: `<:report:484979570852888576>`
};