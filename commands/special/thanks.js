const checkprofile = require("../../fonctions/checkprofile");

exports.run = (client, message, args) => {
	//Faudrait que je pense à faire en sorte que ça soit l'id aussi
	let user = message.mentions.users.first();

	//On chope le serveur de support et le membre associé à l'user
	let guildmemb = client.guilds.get(`463980349614194698`).members.find(val => val.id === message.author.id);
	//S'il a le rôle modo ça va
	if (guildmemb.roles.find(val => val.id === `464725388078219274`)) {
		//S'il a pas mentionné ça va pas
		if (!message.mentions.users.first()) {
			message.react(`❌`);
			return message.channel.send(`${client.em.e} Mentionne quelqu'un par contre...`);
		};
		checkprofile(client, user.id);
		//Sinon bah on modif hop hop hop !
		let u = user.id;
		client.profiles.setProp(u, `vip`, true);
		//Et on confirme que c'est fait !
		message.channel.send(`**<:vips:476329582782447636> GG à <@${user.id}> qui devient VIP !**`);
	}
	//Mais si c'est un arnaqueur, on l'allume !
	else return message.channel.send(`Nope...`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`th`, `thank`,`addvip`],
};

exports.help = {
	name: `thanks`,
	description: `Thanks an user (ça lui donne le vip quoi xD).`,
	usage: `thanks <user>`,
	module: `special`,
	emoji: `<:thanks:484985189970345996>`
};