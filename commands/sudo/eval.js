var Discord = require(`discord.js`);

exports.run = (client, message, args) => {
	const clean = text => {
		if (typeof (text) === "string")
			return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else
			return text;
	}
	try {
		const code = args.join(" ");
		let evaled = eval(code);

		if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);

		message.channel.send(clean(evaled), { code: "xl" });
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`ev`],
};

exports.help = {
	name: `eval`,
	description: `Eval something.`,
	usage: `eval <ce que tu veux>`,
	module: `sudo`,
	emoji: `<:eval:485394399837159425>`
};