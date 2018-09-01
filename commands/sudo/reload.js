//Fonctions are life
const reload = require(`../../fonctions/reload`)

exports.run = (client, message, args) => {
	//Quand je suis fatigué et ouiii
	if (!args[0]) return message.channel.send(`<:facepalm:474618049828356137> Par contre si tu me dis pas quelle commande reload, ça va pas faire...`);
	//Hop hop hop on commence à déclarer pour ensuite optimiser !
	let command;
	let mod;

	//On vérifie que la commande existe
	if (client.commands.has(args[0])) {
		command = args[0];
	} else if (client.aliases.has(args[0])) {
		//Ou que l'alias existe si c'en est un !
		command = client.aliases.get(args[0]);
	};
	//Et on le prend dans notre Collection !

	//Donc si ça n'a rien donné on se barre : la commande n'existe pas !
	if (!command) {
		return message.channel.send(`<:facepalm:474618049828356137> La commande \`${args[0]}\` n'existe pas...`);
	} else {
		//Mais sinon c'est pas la même !
		//On saisit le module (caché dans les conf.help de la commande)
		mod = client.commands.get(command).help.module;
		//On launch le processus
		message.channel.send(`Reload de \`${command}\``)
			.then(m => {
				//On appelle la fonction reload
				reload.run(client, mod, command)
					.then(() => {
						//Si c'est bon (then) on confirme que c'est fait !
						m.edit(`Commande \`${command}\` reloaded avec succès ! <:noel:464406165791440899>`)
						//Un peu de log ca fait du bien des fois
						.then(() => console.log(`Commande ${command} rechargée.`));
						//Ca c'est les commandes que je veux pas runner automatiquement after-reload
						var incmd = [`pub`, `ban`, `discord`, `youtube`, `emergency`, `emoji`, `eval`, `hastebin`, `purge`, `reload`, `report`, `suggest`, `unban`, /*`test`,*/ `baninfo`, `pref`];
						//Donc si l'un de ces éléments est ma commande, on return (la table :noel:)
						if (incmd.includes(command)) return;
						else {
							//Sinon on rechope la commande
							let cmd;
							if (client.commands.has(command)) {
								cmd = client.commands.get(command);
								//Et on la run !
								cmd.run(client, message, args);
							};
						};
					})
					//MAIS, si y'a un fail genre erreur de typo on ça
					.catch(e => {
						//On envoie ça !
						m.edit(`Echec du reload de la commande ${command}\n\`\`\`xl\n${e.stack}\`\`\``);
					});
			});
	};
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`r`],
};

exports.help = {
	name: `reload`,
	description: `Reload une commande.`,
	usage: `Tu n'as pas à l'utiliser ¯\\\_(ツ)_/¯`,
	module: `sudo`,
	emoji: `<:reload:484986450115559424>`
};