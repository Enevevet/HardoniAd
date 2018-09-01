exports.run = (client, message, args) => {

	//FUUUUUUUUUU
	if (!args[0]) {
		message.channel.send(`<:facepalm:474618049828356137> Dis-moi ce que je dois répéter...`);
	}
	else {
		//On chope les args
		const sayMessage = args.join(` `);
		//On supprime le message pour que le farceur reste anonyme
		message.delete().catch();
		//Et le bot envoie le message !
		message.channel.send(sayMessage, { disableEveryone: true });
	};
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`s`],
};

exports.help = {
	name: `say`,
	description: `Faire répéter votre message par le bot.`,
	usage: `say <message à dire>`,
	module: `other`,
	emoji: `<:chat:464236774294814722>`
};