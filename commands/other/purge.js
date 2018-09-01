exports.run = (client, message, args) => {

	//Que les gens qui ont la perm suivantes peuvent l'utiliser !
	if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`Il vous manque la permission \`MANAGE_MESSAGES\` pour utiliser cette commande.`);

	//On récupère les args
	let nums = args.join(` `);
	if (!args[0]) { //si aucun args
		message.channel.send(`<:facepalm:474618049828356137> Merci de me dire combien de message tu veux supprimer...`);
	}

	else { //si args
		let numa = parseInt(nums) + 1;
		if (isNaN(numa)) { //si pas d'args num
			message.channel.send(`<:facepalm:474618049828356137> Merci de rentrer un chiffre...`);
		}
		else { //si args num
			if (numa === 1) { //si args =0
				message.channel.send(`<:facepalm:474618049828356137> Je peux pas supprimer zéro message...`);
			}
			else { //si args != 0
				message.channel.bulkDelete(numa);
				if (numa === 2) { //si args = 1
					message.channel.send(`${numa - 1} message supprimé !`).then(sentMessage => {
						setTimeout(() => {
							sentMessage.delete();
						}, 3000)
					});
				}
				else {
					message.channel.send(`${numa - 1} messages supprimés !`).then(sentMessage => {
						setTimeout(() => {
							sentMessage.delete();
						}, 3000)
					});
				};
			};
		};
	};
}; //Magnifique ! J'avais déjà autrefois posé des commentaires pour me retrouver, c'est mignon !

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`del`, `pu`],
};

exports.help = {
	name: `purge`,
	description: `Supprimer un certain nombre de messages.`,
	usage: `purge <nombreDeMessages>`,
	module: `other`,
	emoji: `<:eponge:464235968749109249>`
};