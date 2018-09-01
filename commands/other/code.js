//Faut lire le fichier code !
const fs = require(`fs`);
//Pour les code de plus de 200 caractères :
const h = require(`hastebin-generator`);

exports.run = (client, message, args) => {

	//Si le mec oublie de dire de quelle commande il parle
	if (!args[0]) return message.channel.send(`${client.em.e} Non mais dis moi de quelle commande tu veux voir le code quoi...\nUtilisation de la commande : \`${exports.help.usage}\``);
	//C'est parti
	let command;
	//On vérifie que la commande existe dans notre Collection
	if (client.commands.has(args[0])) {
		command = args[0];
	} else if (client.aliases.has(args[0])) { //Ou que son alias existe
		command = client.aliases.get(args[0]);
	};
	//Y'a des commandes dont je ne souhaites pas dévioler le code pour pas tout me faire piquer non plus
	if (command === `pub` || command === `discord` || command === `youtube` || command === `prefix`) return message.channel.send(`Je garde quand même le code cette commande :smirk:`);

	//On chope le module (pour trouver le chemin de destination jusqu'au fichier js)
	var mod = client.commands.get(command).help.module;

	//On vérifie que la commande est bonne
	if (client.commands.has(command)) {
		//On lit le fichier
		let commandFile = fs.readFileSync(`./commands/${mod}/${command}.js`, `utf8`);
		//Si il y a plus de 1992 (ça fait 2000 avec le code block sur Discord) on le publie sur Hastebin
		if (commandFile.length < 1992) {
			//Sinon on le poste direct
			message.channel.send(`\`\`\`js\n` + commandFile + `\`\`\``);
		}
		else {
			//Donc s'il fait plus de 2000 caractères on publie sur hb
			message.channel.send(`https://github.com/Enevevet/HardoniAd/blob/master/commands/${mod}/${command}.js`)
		};
	}
	//Par contre si la commande existe pas
	else if (!client.commands.has(command)) {
		message.channel.send(`${client.em.e} Cette commande n'existe pas...\nUtilisation de la commande : \`${exports.help.usage}\``);
	};
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`c`,`showcode`],
};

exports.help = {
	name: `code`,
	description: `Montre le code d'une commande.`,
	usage: `code <nomDeLaCommande>`,
	module: `other`,
	emoji: `<:nodejs:464234938787692555>`
};