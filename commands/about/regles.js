const Discord = require(`discord.js`);

exports.run = (client, message) => {

	//Ca fait beaucoup de commande simples dans ce module :p
	var embedru = new Discord.MessageEmbed()
		.setAuthor(`Règlement HardoniAd`, `https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/141/scales_2696.png`)
		.setDescription(`**__Voici les règles d'utilisation :__**`)
		.setTimestamp()
		.addField(`Article 1.`, `Il est interdit d'utiliser les commandes de pubs à d'autres fins que des fins publicitaires.`)
		.addField(`Article 2.`, `Il est interdit d'utiliser du langage/des images pouvant inciter à la haine.`)
		.addField(`Article 3.`, `Les multi-comptes sont interdits.`)
		.setThumbnail(`https://media.discordapp.net/attachments/463980349614194700/464688512772472842/profilpfp.png?width=473&height=473`)
		.setColor(`#FF0000`)
		.setFooter(`HardoniAd by Enevevet#2020`, `https://cdn.discordapp.com/avatars/329669021043523594/d44fb06af2453336e3c52fb4921f4723.png?size=2048`);

	message.channel.send(embedru);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`rules`],
};

exports.help = {
	name: `regles`,
	description: `Afficher le règlement du bot.`,
	usage: `regles`,
	module: `about`,
	emoji: `:scales:`
};