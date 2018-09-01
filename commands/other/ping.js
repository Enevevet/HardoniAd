exports.run = (client, message) => {
	//On fait la différence entre l'envoi et l'arrivée du message ! Et on prend le ping de Discord !
	message.channel.send(`**Pong !** :ping_pong:\n\`\`\`http\n  Bot  :: ${new Date().getTime() - message.createdTimestamp} ms\nClient :: ${Math.floor(client.ping)} ms\`\`\``);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`latency`],
};

exports.help = {
	name: `ping`,
	description: `Montrer la latence du bot`,
	usage: `ping`,
	module: `other`,
	emoji: `<:ping_pong:484978055597654026>`
};