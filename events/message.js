//Toujours quand on a besoin du prefix !
const config = require(`../config.json`);

//Voici  notre module !
exports.run = (client, message) => {

	//Ne pas ignorer les bots c'est pas bon pour la santé !
	if (message.author.bot) return;

	var prefix;
	if (message.channel.type === `dm` || !client.prefixes.has(message.guild.id)) prefix = `=`
	else prefix = client.prefixes.get(message.guild.id);

	//Petit prank pour les gars qui mentionnent le bot
	if (message.content.includes(`<@468135634540691468>`)) {
		message.react(`470887033800359956`);
		message.channel.send(`Utilise plutôt mon préfix \`${prefix}\` ! Je n'aime pas les mentions !`);
	};
	//Petit prank pour ceux qui parelent de moi
	if (message.content.toLowerCase().includes(`hardoniad`)) message.react(`464392997409390602`);


	//Comme ça on check plus que les messages qui commencent par le préfix
	if (!message.content.startsWith(prefix)) return;
	//Ce qui est après le préfix c'est notre command !
	var command = message.content.split(` `)[0].slice(prefix.length).toLowerCase();
	//Ce qui suit notre commande (le reste du message), c'est nos arguments
	var args = message.content.split(` `).slice(1);
	//Déclarer des variables sans valeur ça a du bon !
	var cmd;
	//Si notre collection Discord (vue dans le app.js) a les commandes (ou les alias) on prend tout ça !
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		cmd = client.commands.get(client.aliases.get(command));
	};
	//Mais si la commande est pas bonne du tout :
	if (!cmd) {
		message.react(`464228811416797184`);
		return message.channel.send(`<:interrogation:464244817321525268> Je vois pas ce que tu veux me dire là ! Je ne connais pas cette commande !\nPeut-être peux-tu faire une suggestion pour que mon développeur l'ajoute avec \`${prefix}suggest <Ta belle suggestion>\` !`);
	};
	//A voir plus tard dans les fichiers de commande, c'est juste si elles sont désactivées complètement...
	if (cmd.conf.enabled === false) return message.channel.send(`Commande inactive... :zzz:`);
	//Ou juste pour les serveurs
	if (cmd.conf.guildOnly === true && message.channel.type === `dm`) return message.channel.send(`Commande réservée aux serveurs... :zzz:`);
	//Ca c'est réservé qu à moi ! (Les commandes dans le module sudo)
	if (cmd.help.module === `sudo` && !client.admins.includes(message.author.id)) return message.channel.send(`Cette commande est réservée aux Administrateurs !`);
	//Donc si tout se passe bien : ON RUN LA COMMANDE ! (avec les arguments de fonction client, message (primordiaux) et args !)
	if (cmd) {
		try {
		cmd.run(client, message, args);
		}
		catch (e) {
			console.error(e);
			message.channel.send(`${client.em.f} **__ERREUR :__**\`\`\`xl\n${e.stack}\`\`\`\nMerci de prévenir <@329669021043523594> (Enevevet#2020) sur le serveur de support (https://discord.gg/haBpCVw)`);
		};
	};
};