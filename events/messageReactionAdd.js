exports.run = (client, reaction, user) => {
	//Si un user réagit avec l'emoji HardoniAd
	if (reaction.emoji.id != `464392997409390602`) return;
	//On fait de même
	reaction.message.react(`464392997409390602`);
}