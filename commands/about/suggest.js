exports.run = (client, message, args) => {

	var args = args.join(` `);
	//Faut quand même un minimum de mots
	if (!args[4]) return message.channel.send(`<:facepalm:474618049828356137> Merci d'au moins mettre une suggestion de plus de 5 mots...`);
	//On chope le canal #suggestion du serveur de support du bot
	client.channels.get(`474371242317840384`).send(args).then(m => { //On l'envoie
		//Et on met deux réactions pour connaitre l'avis de la population    
		m.react(`473803590532595712`);
		m.react(`473803719440597003`);
	});
	//Et on confirme quand même au mec que c'est fait
	message.channel.send(`<:done:473803590532595712> Suggestion envoyée au créateur du bot !`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`sug`],
};

exports.help = {
	name: `suggest`,
	description: `Suggérer une fonctionnalité.`,
	usage: `suggest <suggestion>`,
	module: `about`,
	emoji: `<:suggestion:484975307745656832>`
};