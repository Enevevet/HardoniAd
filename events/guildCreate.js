exports.run = (client, guild) => {
	//Si l'owner n'a pas anticipé en créant les deux canaux :
	if (!guilds.channels.filter(c => c.name === `hardoniad`) && !guilds.channels.filter(c => c.name === `hardoniad-special`)) {
		//On les crée nous-même !
		if (!guild.channels.filter(c => c.name === `hardoniad`)) {
			guild.createChannel(`hardoniad`, `text`);
		};
		if (!guild.channels.filter(c => c.name === `hardoniad-special`)) {
			guild.createChannel(`hardoniad-special`, `text`);
		};
		//Puis on va quand même lui dire Coucou ! :p
		guild.owner.send(`Hey ` + guild.owner.user.username + ` !\nMerci de m'avoir ajouté sur ton serveur ! Je suis HardoniAd, bot développé par Enevevet#2020, je suis spécialisé dans la pub Inter-serveur (ou VCS pour les intimes :wink:) !\nEn arrivant sur ton serveur, j'ai créé un canal \`#hardoniad\` et \`#hardoniad-special\` avec les permissions nécessaires pour que seuls toi et les admins puissent y écrire mais que tout le monde puissent y lire les pubs !\nPour envoyer leurs pubs les membres n'auront qu'à aller dans le canal de commandes bot et à faire \`=p <Leur pub>\` ! Trop cool non ?\n\nAlors go !! Vas m'annoncer à ta communauté ! :tada:`);
	}
	else {
		//Petit changement pour le remercié d'avoir anticipé !
		guild.owner.send(`Hey ` + guild.owner.user.username + ` !\nMerci de m'avoir ajouté sur ton serveur ! Je suis HardoniAd, bot développé par Enevevet#2020, je suis spécialisé dans la pub Inter-serveur (ou VCS pour les intimes :wink:) !\nEn arrivant sur ton serveur, j'ai créé un canal \`#hardoniad\` et \`#hardoniad-special\` avec les permissions nécessaires pour que seuls toi et les admins puissent y écrire mais que tout le monde puissent y lire les pubs !\nPour envoyer leurs pubs les membres n'auront qu'à aller dans le canal de commandes bot et à faire \`=p <Leur pub>\` ! Trop cool non ?\n\nAlors go !! Vas m'annoncer à ta communauté ! :tada:`);
	};
};