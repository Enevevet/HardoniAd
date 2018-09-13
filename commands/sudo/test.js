/*Boh boh boh, pas besoin de commenter ça, c'est mon aire de jeux !
ça change bien 456789 fois par jours ici alors si à chaque fois
je devais tout commenter, j'aurais pas fini xD*/
const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('snekfetch');

exports.run = async (client, message, args) => {
	switch (args[0]) {
		case `profile`:
			const canvas = Canvas.createCanvas(750, 501);
			const ctx = canvas.getContext('2d');

			const background = await Canvas.loadImage('../../ressources/profile.jpg');
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
			const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
	}






	//client.profiles.deleteAll();

	/*var u = message.author.id
 const name = message.author.username.length > 20 ? message.author.username.substring(0, 17) + "..." : message.author.username;
 var theme = client.profiles.getProp(u, `theme`);
 var colo = colorFile[theme];
 var canvas = new Canvas(400, 300)
	 .setColor(colo)
	 .addRect(0, 0, 400, 300)
	 .setColor("#2C2F33")
	 .addRect(0, 0, 150, 150)
	 .addRect(195, 45, 205, 46)
	 .addRect(195, 108, 205, 46)
	 .setColor("#FFFFFF")
	 .setTextFont("18px Helvetica")
	 .setTextAlign('left')
	 .setColor("#2C2F33")
	 .addText("User :", 195, 27)
	 .setTextAlign('center')
	 .setColor("#FFFFFF")
	 .addText(name, 298, 75)
	 .addImage(avatar, 50, 50, 100, 100)
	 .toBuffer();
 message.channel.send(new Discord.MessageAttachment(canvas, "mycanvas.png"))

 /*var msg = ` `;
 client.commands.forEach(command => {
	 msg = msg + `${command.help.name} ${command.help.emoji}\n`
 });

 message.channel.send(msg);*/

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`t`],
};

exports.help = {
	name: `test`,
	description: `test.`,
	usage: `test`,
	module: `sudo`,
	emoji: `<:test:484987171229532172>`
};