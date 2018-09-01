exports.run = (client, message) => {
	//Et oui
	let t = 0;
	//On prend tous les bans (enfin leurs ids)
	var banne = client.banned.keys();
	//On met le début du messages
	let msg = `**__<:banhammer:474618067553484810> Les utilisateurs bannis sont :__**\n`;
	//Et tant que t est inférieur au nombre de bannis
	while (t < client.banned.size) {
		//On affiche les ids
		var r = banne.next().value;
		//Et on les incrémentent au messages
		msg = msg + `<@${r}> (${r})\n`;
		//Et on incrément t bien sûr
		t += 1;
	};
	//Et quand c'est fini on envoie le message ! (Quand même)
	message.channel.send(msg)
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`bl`, `bans`],
};

exports.help = {
	name: `banlist`,
	description: `Ban is life`,
	usage: `banlist`,
	module: `moderation`,
	emoji: `<:jail:484976480418267136>`
};