exports.run = async (client, event) => {
	if (!(event.t === "MESSAGE_REACTION_ADD" || event.t === "MESSAGE_REACTION_REMOVE")) return
	const { d: data } = event;
	console.log(data.emoji.name)
	const channel = client.channels.get(data.channel_id)|| await user.createDM();
	if (!channel.messages.has(data.message_id)) return;
	const message = await channel.messages.fetch(data.message_id);
	if (!client.users.has(data.user_id)) return;
	const ruser = await client.users.get(data.user_id);
	if (ruser.bot) return
	if (client.banned.has(ruser.id)) return message.channel.send(`<:facepalm:474618049828356137> Vous êtes banni du système de pub HardoniAd... Rendez-vous sur le serveur de support : https://discord.gg/haBpCVw`);

	//if (message.author.id !== "468135634540691468") return
	//if (client.banned.has(message.author.id)) return
	if (data.emoji.name === "🚩") {

		if (message.author.id === ruser.id) return message.channel.send("Don't report yourself bitch")
	//On cherche dans les users que connait le bot le méchant
	client.users.fetch(message.author.id)
		.then((User) => {
			//Si le méchant existe
			//On me recherche (enevevet)
			client.users.fetch(`329669021043523594`)
				//On me l'envoie mp
				.then((Nvv) => {
					Nvv.send(`__**Signalement de <@${User.id}> par <@${ruser.id}>:**__ \`\`\`js\n${message.content}\`\`\`\n\n__Infos supplémentaires :__ ${User.id} ; ${User.username}#${User.discriminator} ; ${ruser.id} ; ${ruser.username}#${ruser.discriminator}`);
				});
			//Et on fait de même à Paulé
			client.users.fetch(`376812375795302402`)
				.then((pau) => {
					pau.send(`__**Signalement de <@${User.id}> par <@${ruser.id}>:**__ \`\`\`js\n${message.content}\`\`\`\n\n__Infos supplémentaires :__ ${User.id} ; ${User.username}#${User.discriminator} ; ${ruser.id} ; ${ruser.username}#${ruser.discriminator}`);
				});
		})
		.catch((err) => { //Si l'id est invalide
			console.log(err);
		});
	}
	else return
	console.log(event);
	console.log(data);
	console.log(message);
	console.log(ruser)
	console.log("Bout du bout");
}