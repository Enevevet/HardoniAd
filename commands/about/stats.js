//Embed is love
const Discord = require(`discord.js`);
//MRC le npm !!
const os = require(`os-utils`);
//Ces dates de *!§ù$ù*$ù
const moment = require(`moment`);
moment.locale(`fr`);

//Petite fonction pour voir depuis quand le bot est online ! Matez moi ça !
function conva(ms) {
	//On décalre le bon baille
	var d, h, m, s;
	//On mets les ms en s
	s = Math.floor(ms / 1000);
	//Les s en m
	m = Math.floor(s / 60);
	//En gardant les secondes de plus (pour pas avoir 1,5 minutes au lieu de 1m30)
	s = s % 60;
	//Pareil les minutes en heures
	h = Math.floor(m / 60);
	//On garde les minutes en plus (merci Euclide)
	m = m % 60;
	//Et les heureus en jours
	d = Math.floor(h / 24);
	//Toujours en gardant
	h = h % 24;
	//MAINTENANT !
	if (d > 0) { //Si y'a plus de 0 jours on garde que ça
		return d + ` jours`;
	};
	if (h > 0) { //Si y'a plus de 0 heures on garde
		return h + ` heures`;
	};
	if (m > 0) { //Pareil avec les minutes
		return m + ` minutes`;
	}
	else { // Sinon bah que les secondes bande de patates !
		return s + ` secondes`;
	};
};

//On associe le status à une couleur
const status = {
	online: `#43b581`,
	idle: `#faa61a`,
	dnd: `#f04747`,
	offline: `#747f8d`
};




exports.run = (client, message) => {

	//On fait tout dans la boucle cpuUsage
	os.cpuUsage(function (v) {

		//Le nombre de bans
		var banne = client.banned.size;
		//l'uptime du bot
		let u = conva(client.uptime);
		//La datede création du bot
		let dat = moment(client.user.createdAt).format(`dddd Do MMMM YYYY, HH:mm:ss`);
		var date = dat.substring(0, 1).toLocaleUpperCase() + dat.substring(1);
		//On coupe à 3 chiffres après la virgules
		var cpu = v.toFixed(3);

		//On fait l'embed
		let embed = new Discord.MessageEmbed()
			.setAuthor(`À propos d'HardoniAd`, `https://emojipedia-us.s3.amazonaws.com/thumbs/120/htc/37/information-source_2139.png`)
			.setDescription(`**Qui suis-je ?**`)
			.setTimestamp()
			.addField(`Développeur`, `Enevevet#2020`, true)
			.addField(`Créé`, date, true)
			.addField(`—— Stats ——`, `\`\`\`http\nServ.    ::  ${client.guilds.size}\nCanaux   ::  ${client.channels.size}\nUtilis.  ::  ${client.users.size}\nEmojis   ::  ${client.emojis.size}\nBanned   ::  ${banne}\`\`\``, true)
			.addField(`—— Usage ——`, `\`\`\`http\nCPU      ::  ${cpu}%\nMémoire  ::  ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB\nPing     ::  ${parseInt(client.ping)} ms\nUptime   ::  ${u}\`\`\``, true)
			.addField(`—— Environment ——`, `\`\`\`http\nNode.js  :: v10.9.0\nOS       ::    Linux ×64\nModule   ::  Discord.js\nVersion  ::  11.4.2\`\`\``, true)
			.setThumbnail(`https://media.discordapp.net/attachments/463980349614194700/464688512772472842/profilpfp.png?width=473&height=473`)
			.setColor(status[client.user.presence.status])
			.setFooter(`HardoniAd by Enevevet#2020`, `https://cdn.discordapp.com/avatars/329669021043523594/d44fb06af2453336e3c52fb4921f4723.png?size=2048`)
			.setTimestamp();


		//Et on balance !
		message.channel.send(embed);
	});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`info`,`statistics`],
};

exports.help = {
	name: `stats`,
	description: `Montrer l'état du bot.`,
	usage: `stats`,
	module: `about`,
	emoji: `<:interrogation:464244817321525268>`
};