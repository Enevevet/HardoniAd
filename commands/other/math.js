//Je kiffe ce module en vrai !
const math = require(`mathjs`);

exports.run = (client, message, args) => {
	//On déclare :p
	let calc;
	var args = args.join(` `);
	try {
		calc = math.eval(args);
	} catch (err) {
		calc = err;
	};
	//Code simple et efficace !
	//On envoie le résultat !
	message.channel.send(`**Calcul**\n\`\`\`js\n${args}\`\`\`\n**Résultat**\n\`\`\`js\n${calc}\`\`\``);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`m`],
};

exports.help = {
	name: `math`,
	description: `Faisons des maths.`,
	usage: `maths <votre calcul`,
	module: `other`,
	emoji: `<:maths:484977703771176970>`
};