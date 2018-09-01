//Parce que les emojis chiffres beuguent ....
const emojif = require(`../../extra_modules/emojiCharacters`);
//Pour les embeds c'est cool
const Discord = require(`discord.js`);

exports.run = (client, message, args) => {

	//Et oui pour quand je suis fatigué
	if (!args[1]) return message.channel.send(`${client.em.e} Toi tu sais pas utiliser cette commande alors que t'es mon owner ? Wtf ?...`);
	//Les bonnes variables sa mère !
	var t = args[0];
	var q = args.slice(1).join(` `);
	var rt;
	//On chope déjà les emojis !
	var num = [emojif[1], emojif[2], emojif[3], emojif[4], emojif[5], emojif[6], emojif[7], emojif[8], emojif[9], emojif[10]];

	//Si c'est juste un yes/no on prend que les deux emojis (ça c'est leur ids)
	if (t === `yn`) rt = [`473803590532595712`, `473803719440597003`];
	//Sinon tu prends la taille de l'args[] (ouais c'est bourrin)
	else if (t.length < 11 && t.length > 1) rt = num.slice(0, t.length);
	//Là c'est quand j'abuse
	else message.channel.send(`Error ?`);

	//Le petit embed alambiqué sévère
	var embed = new Discord.MessageEmbed()
		.setAuthor(`Nouveau sondage !`)
		.setDescription(q)
		.setColor(`#FCB00A`)
		.setThumbnail(`https://emojipedia-us.s3.amazonaws.com/thumbs/120/google/119/scales_2696.png`)
		.setFooter(`HardoniAd by Enevevet#2020`, `https://images-ext-1.discordapp.net/external/5nTpUVeW2sKkAMV8BFW7WEI3hxDGUj5zRxr8p8Di8bA/%3Fwidth%3D473%26height%3D473/https/media.discordapp.net/attachments/463980349614194700/464688512772472842/profilpfp.png`)
		.setTimestamp();

	//On mentionne la petite Rewrite squad
	message.channel.send(`<@&470880125936992257>`).then(m => {
		//On supprime le message parce qu'on assume pas la mention
		m.delete();
	});
	//Puis on balance l'embed
	message.channel.send(embed).then(m => {
		//On fixe une fonction `delay` qui attend 500ms à chaque fois !
		function delay() {
			return new Promise(resolve => setTimeout(resolve, 500));
		};
		//Là on fait la fonction attendre que l'emoji est réagi
		async function delayedReact(emote) {
			//Ou on appelle notre fonction delay
			await delay();
			//Et qu'on react
			m.react(emote);
		};
		//Et là la fonction ou on prend l'emote dans l'array !
		async function processArray(rt) {
			//Pour autant d'éléments (appelés emotes) qu'il y a dans rt
			for (const emote of rt) {
				//On appelle la fonction de réaction (qui appellera la fonction delay)
				await delayedReact(emote);
			};
		};
		//Et là on appelle la fonction de scan de l'array (qui appelera la fonction de réaction [qui appellera la fonction delay]) xD
		processArray(rt)
	});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`pl`],
};

exports.help = {
	name: `poll`,
	description: `Créer un sondage.`,
	usage: `poll <typeDuSondage> <Question>`,
	module: `sudo`,
	emoji: `<:poll:484986095726100491>`
};