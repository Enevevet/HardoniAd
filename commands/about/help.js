const Discord = require(`discord.js`)


exports.run = (client, message, args) => {

	var prefix;
	if (message.channel.type === `dm` || !client.prefixes.has(message.guild.id)) prefix = `=`
	else prefix = client.prefixes.get(message.guild.id);

	if (!args[0]) {
		var t = new Discord.MessageEmbed()
			.setAuthor(`Aide HardoniAd`, `https://emojipedia-us.s3.amazonaws.com/thumbs/120/htc/37/information-source_2139.png`)
			.setDescription(`__Utilisez les commandes suivantes pour obtenir de l'aide :__`)
			.setTimestamp()
			.setThumbnail(`https://media.discordapp.net/attachments/463980349614194700/464688512772472842/profilpfp.png?width=473&height=473`)
			.setColor(`#36393e`)
			.setFooter(`HardoniAd by Enevevet#2020`, `https://cdn.discordapp.com/avatars/329669021043523594/d44fb06af2453336e3c52fb4921f4723.png?size=2048`);
		client.modules.forEach(el => {
			var em = require(`../${el}/module`);
			ms = `${`\`${prefix}help ${el}\``}`

			t.addField(`${em.emoji} ${el.substring(0, 1).toLocaleUpperCase() + el.substring(1)}`, ms, true)
		})
		t.addField(`<:saturne:474369852967092224> Toutes les commandes`, `\`${prefix}help all\``, true)
		t.addField(`<:read_the_docs:468339181568000020> Nota Bene :`, `En rajoutant \`mp\` après le nom de la sous-help, le bot vous envoie l'aide en Messages Privés ! ex. \`${prefix}help all mp\``)

	}
	else {
		var t;
		var ms = ` `;
		let moduleh = args[0].toLowerCase();

		var modcmd = client.commands.filter(command => command.help.module === moduleh);
		if (moduleh === `all`) {
			t = new Discord.MessageEmbed()
				.setThumbnail(client.user.avatarURL(`png`, 2048))
				.setAuthor(`Aide HardoniAd`, `https://emojipedia-us.s3.amazonaws.com/thumbs/120/htc/37/information-source_2139.png`)
				.setTimestamp()
				.setColor(`#36393e`)
				.setFooter(`HardoniAd by Enevevet#2020`, `https://cdn.discordapp.com/avatars/329669021043523594/d44fb06af2453336e3c52fb4921f4723.png?size=2048`);
			client.modules.forEach(el => {
				var em = require(`../${el}/module`);

				var a = client.commands.filter(co => co.help.module === el)
				ms = ` `
				a.forEach(dz => {
					ms = ms + `\`${dz.help.name}\` `
				})
				t.addField(`${em.emoji} - ${el.substring(0, 1).toLocaleUpperCase() + el.substring(1)}`, ms)
			})

		}
		else if (!client.modules.includes(moduleh) && !client.commands.has(args[0]) && !client.aliases.has(args[0])) return message.channel.send(`Ce module n'existe pas !`)
		else if (client.modules.includes(moduleh)) {
			t = new Discord.MessageEmbed()
				.setThumbnail(client.user.avatarURL(`png`, 2048))
				.setAuthor(`Aide HardoniAd`, `https://emojipedia-us.s3.amazonaws.com/thumbs/120/htc/37/information-source_2139.png`)
				.setDescription(`│**Module : ${moduleh}**│`)
				.setTimestamp()
				.setColor(`#36393e`)
				.setFooter(`HardoniAd by Enevevet#2020`, `https://cdn.discordapp.com/avatars/329669021043523594/d44fb06af2453336e3c52fb4921f4723.png?size=2048`);
			modcmd.forEach(el => {
				t.addField(`${el.help.emoji} ${el.help.description}`, `\`${prefix}${el.help.usage}\``)
			})
		}
		else {
			let command;
			//On vérifie que la commande existe dans notre Collection
			if (client.commands.has(args[0])) {
				command = args[0];
			} else if (client.aliases.has(args[0])) { //Ou que son alias existe
				command = client.aliases.get(args[0]);
			};

			//On vérifie que la commande est bonne
			if (client.commands.has(command)) {
				//On lit le fichier
				command = client.commands.get(command);
				//Petit fantasme emojetique
				var en = (command.conf.enabled === true) ? `✅` : `❌`;
				var go = (command.conf.guildOnly === true) ? `✅` : `❌`;
				var prefix;
				if (message.channel.type === `dm` || !client.prefixes.has(message.guild.id)) prefix = `=`
				else prefix = client.prefixes.get(message.guild.id);


				//Et on envoie la sauce !
				t = `\`\`\`md\n              # ${command.help.name} #\n=========================================\n[   Utilité   ][ ${command.help.description} ]\n[ Utilisation ][ ${prefix}${command.help.usage} ]\n[   Aliases   ][ ${command.conf.aliases.join(`, `)} ]\n[   Module    ][ ${command.help.module} ]\n[   Activée   ][ ${en} ]\n[Serveur uniq.][ ${go} ]\`\`\``;
			}

		}


	}
	args.includes(`mp`) ? message.author.send(t) : message.channel.send(t);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`h`],
};

exports.help = {
	name: `help`,
	description: `Afficher l'aide du bot.`,
	usage: `help [sous-cmd]`,
	module: `about`,
	emoji: `<:help:483096985419644933>`
};