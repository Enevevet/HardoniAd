exports.run = (client) => {
	//Quand le bot est prêt on log tout ça
	console.log(`\nHardoniAd : Prêt à servir ${client.users.size} utilisateurs, dans ${client.channels.size} channels de ${client.guilds.size} servers.`);
	//On met un jeu de type Watching pour que ça mette "Regarde : tatatatatataaaa"
	client.user.setActivity(`Enevevet try hard le code`, { type: `WATCHING` });
	//En "Ne pas déranger" pour la petite touche d'originalité !
	client.user.setStatus(`dnd`);
};