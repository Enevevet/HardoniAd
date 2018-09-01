const Discord = require(`discord.js`)

exports.run = (client, message) => {

	//Tout tout marqué !
	let embed = new Discord.MessageEmbed()
		.setAuthor(`Liens HardoniAd`, `https://images-ext-1.discordapp.net/external/zlvpKAGh-KYSYn0-j0g_FTPwRuTHRkMHopEa1jXi790/https/cdn.discordapp.com/emojis/474731084312215552.png`)
		.setDescription(`**__Voici les liens importants :__**`)
		.setTimestamp()
		.addField(`Ajouter le bot`, `[Cliquez ici !](https://discordapp.com/api/oauth2/authorize?client_id=468135634540691468&permissions=8&scope=bot)`)
		.addField(`Serveur de support`, `https://discord.gg/haBpCVw`, true)
		.addField(`GitHub`, `Pas besoin de ça ! Vous avez la commande \`=code\` !\nMais bon si vous le voulez vraiment, voilà : https://github.com/Enevevet/HardoniAd :p`)
		.setThumbnail(`https://media.discordapp.net/attachments/463980349614194700/464688512772472842/profilpfp.png?width=473&height=473`)
		.setColor(`#36393e`)
		.setFooter(`HardoniAd by Enevevet#2020`, `https://cdn.discordapp.com/avatars/329669021043523594/d44fb06af2453336e3c52fb4921f4723.png?size=2048`)
		.setTimestamp();

	message.channel.send(embed);

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`links`,`invite`,`info`],
};

exports.help = {
	name: `liens`,
	description: `Afficher les liens du bot.`,
	usage: `liens`,
	module: `about`,
	emoji: `:link:`
};