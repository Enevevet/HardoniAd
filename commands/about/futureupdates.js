const Discord = require(`discord.js`);

exports.run = (client, message) => {

	//Pas compliqué ça !

	let embedfu = new Discord.MessageEmbed()
		.setAuthor(`Futures Updates HardoniAd`, `https://emojipedia-us.s3.amazonaws.com/thumbs/120/htc/37/information-source_2139.png`)
		.setDescription(`**__Voici les fonctionnalités en cours de développement :__**`)
		.setTimestamp()
		.addField(`Report de pub`, `En mettant une réaction \`🚩\`, le message est signalé à l'équipe de modération.`)
		.addField(`HardoniaAd Starring`, `Lorsqu'une pub atteint 30 réactions \`⭐️\` elle est re-publiée en #hardoniad-star !`, true)
		.setThumbnail(`https://media.discordapp.net/attachments/463980349614194700/464688512772472842/profilpfp.png?width=473&height=473`)
		.setColor(`#FCB00A`)
		.setFooter(`HardoniAd by Enevevet#2020`, `https://cdn.discordapp.com/avatars/329669021043523594/d44fb06af2453336e3c52fb4921f4723.png?size=2048`)
		.setTimestamp();

	message.channel.send(embedfu);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`fu`, `wip`,`comingsoon`],
};

exports.help = {
	name: `futureupdates`,
	description: `Voir le WIP du bot.`,
	usage: `futureupdates`,
	module: `about`,
	emoji: `<:updates:474649302191570944>`
};