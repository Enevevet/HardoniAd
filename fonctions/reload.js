exports.run = (client, mod, command) => {

	//Pour être sûr que c'est fait c'est essentiel
	return new Promise((resolve, reject) => {
		try {
			//On supprimme le cache qui avait été demandé à la création de la commandes
			delete require.cache[require.resolve(`../commands/${mod}/${command}`)];
			//On requiert de nouveau la commande
			let cmd = require(`../commands/${mod}/${command}`);
			//On supprime l'ancienne de la collection
			client.commands.delete(command);
			//On supprime également l'alias
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			//On le recrée
			client.commands.set(command, cmd);
			//On recrée l'alias
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			//[EXE] xD
			resolve();
		} catch (e) {
			//Chuuuut xD
			reject(e);
		};
	});
};