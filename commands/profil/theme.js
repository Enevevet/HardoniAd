//Faut vérifier que la couleur est legit :thinking:
const colorFile = require(`../../extra_modules/colorFile`);
//Ô embed, mon grand embed...
const Discord = require(`discord.js`);
//
const checkprofile = require(`../../fonctions/checkprofile`)

exports.run = (client, message, args) => {

	checkprofile(client, message.author.id);

	var a = Object.keys(colorFile).join(", ");
	let colorargs = args.join(' ');
	//Si le mec est *fatigué* et qu'il met pas la bonne couleur (ou qu'il en mets pas du tout :issou:)
	if (!colorargs || !colorFile.hasOwnProperty(colorargs.toLowerCase())) return message.channel.send(`Merci de choisir parmi les couleurs suivantes : ${a}`);


	if (client.profiles.getProp(message.author.id, `theme`) === colorargs) return message.channel.send(`${client.em.e} Tu as déjà ce thème appliqué !`)

	//S'il veut un thème vip mais qu'il l'est pas
	if (colorargs.toLowerCase() === `random` && client.profiles.getProp(message.author.id, `vip`) === false) return message.channel.send(`Désolé mais ce thème est reservé aux VIPS`);

	//Bref on modif...
	client.profiles.setProp(message.author.id, `theme`, colorargs.toLowerCase());

	//On fait notre embed
	var e = new Discord.MessageEmbed()
		.setTitle(`Thème de ${message.author.username}`)
		.setTimestamp()
		.setDescription(`Le thème ${colorargs.toLowerCase()} vient de vous être appliqué.`)
		.setColor(colorFile[colorargs.toLowerCase()])
		.setThumbnail(message.author.avatarURL)
		.setFooter(`HardoniAd by Enevevet#2020`);

	//Et on l'envoie (wahou épique ce code)
	message.channel.send(e);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`color`],
};

exports.help = {
	name: `theme`,
	description: `Modifier le thème de son profil.`,
	usage: `theme <typeDeThème>`,
	module: `profil`,
	emoji: `<:theme:484980585438248981>`
};