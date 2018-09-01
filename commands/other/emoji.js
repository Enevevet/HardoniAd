//Ahlàlà les dates
const moment = require(`moment`);
moment.locale(`fr`);
//Ahlàlà les emebeds
const Discord = require(`discord.js`);

exports.run = (client, message, args) => {

	//Décidemment ces dates
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	var emo;
	if (!args[0]) return message.channel.send(`${client.em.e} Ok mais de quel emoji tu parles ?...\nUtilisation de la commande : \`emoji <emoji>\``);

	//Si l'user parlait de son nom
	if (message.guild.emojis.some(emoji => emoji.name === args[0].toLowerCase())) {
		//On le prend
		emo = message.guild.emojis.find(e => e.name === args[0].toLowerCase());
	}
	//Sinon
	else {
		//S'il parlait de son id on le prend
		if (message.guild.emojis.some(emoji => emoji.id === args[0])) emo = message.guild.emojis.get(args[0]);
		else {
			//Sinon si l'emoji est complet
			//On le décompose avec un regex
			var emoRegex = /<(a?):([A-z0-9_]{2,32}):(\d{17,19})>/g;
			//Et on sélectionne
			if (args[0].match(emoRegex)) {
				//On le scanne
				idav = emoRegex.exec(args[0]);
				//Et puis on prend l'emote seulement la quatrième partie du scan à savoir son id
				emo = message.guild.emojis.get(idav[3]);
			};
		};
	};
	//Mais si tout ça a fail c'est que l'emote n'existe pas ! Je peux pas faire mieux monsieur !
	if (!emo) {
		message.channel.send(`${client.em.e} Merci de rentrer un emoji du serveur...`);
	}
	else {
		//Mais bon si on l'a trouve on va gâter le publics en informations ! Alors on déclare tout ça !
		var emoicn = emo.url;
		var emodate = emo.createdAt;
		//Cette date de création qu'il faut remanier
		var emof = moment(emodate).format(`dddd Do MMMM YYYY, HH:mm:ss`);
		//Et capitaliser (la première lettre)
		var emofr = emof.substring(0, 1).toLocaleUpperCase() + emof.substring(1);
		//le fantasme des emojis
		var u = emo.animated === true ? `<:done:473803590532595712>` : `<:nope:473803719440597003>`;

		//On fait le petit embed des familles
		let embedaR = new Discord.MessageEmbed()
			.setTitle(`Informations de l'emoji :`)
			.setColor(Math.floor(Math.random() * 16777214) + 1)
			.setThumbnail(emoicn)
			.setFooter(`JsTester by Enevevet#2020`, `https://images-ext-2.discordapp.net/external/yukS6J8Ni3eVSnxiz8Hm6X3lKpF_zcyeKwylzAtiEww/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/329669021043523594/d44fb06af2453336e3c52fb4921f4723.png?width=473&height=473`)
			.addField(`Nom`, `\`${emo.name}\``, true)
			.addField(`Id`, `\`${emo.id}\``, true)
			.addField(`Nom complet`, `\`<:${emo.identifier}>\``)
			.addField(`Animé ?`, u, true)
			.addField(`Créé le :`, `\`${emofr}\``, true)
			.setTimestamp();

		//Et on l'envoie !
		message.channel.send(embedaR);
	};
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`e`, `emote`,`emoticone`],
};

exports.help = {
	name: `emoji`,
	description: `Montrer les infos d'un emoji`,
	usage: `emoji <emoji>`,
	module: `other`,
	emoji: `<:idea:464242319118434324>`
};