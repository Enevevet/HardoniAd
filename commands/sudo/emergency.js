exports.run = (client) => {
	client.destroy();
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`urgence`, `15`, `112`],
};

exports.help = {
	name: `emergency`,
	description: `À n'utiliser qu'en cas d'extrême urgence.`,
	usage: `emergency`,
	module: `sudo`,
	emoji: `<:emergency:484985781761474571>`
};