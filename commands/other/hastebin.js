//Sinon ça marche pas :noel:
const h = require(`hastebin-generator`);

exports.run = (client, message, args) => {

	//Pourquoi il faut tout le temps faire ça ? :') Je vais finir par faire un try catch général
	if (!args[0]) return message.channel.send(`<:facepalm:474618049828356137> Tu veux que je poste quoi mec ?...`);
	args = args.join(` `);
	//Ca le poste
	h(args, `js`).then(r => {
		message.channel.send(r);
	}).catch(console.error);
};

exports.conf = {
	enabled: false,
	guildOnly: false,
	aliases: [`hb`],
};

exports.help = {
	name: `hastebin`,
	description: `Poster le texte que vous voulez sur Hastebin.`,
	usage: `hastbin <typeDuTexte> <Votre Texte>`,
	module: `other`,
	emoji: `<:hb:473971103816089612>`
};