exports.run = (client, member) => {
	//Si c'est pas sur le serveur de support
	if (member.guild.id != `463980349614194698`) return;
	//On prend le channel avec l'id tel de gros bourrins
	const bchan = member.guild.channels.get(`464760154848624641`);
	//Aha voici tous les messages possibles !
	const bvn = [`Salut {user} ! Ça fait longtemps qu'on t'attend ici !`,
		`Tel un avion, {user} atterrit ! :airplane_arriving:`,
		`HardoniAd dit : \`Que {user} soit.\` Et {user2} fut !`,
		`0100001001101001011001010110111001110110011001010110111001110101011001010010000000100001 {user}`,
		`Tous à l'abri ! {user} vient de spawn !`,
		`Damn ! Ne serait-ce pas le fameux {user} ? :open_mouth:`,
		`{user} is love, {user2} is life !`,
		`__**ERROR 404 :**__ {user} not found.`,
		`**alert(\`{user} est là !\`)**`,
		`npm install {user}`,
		`const {user} = require("{user2}");`];

	//Et on en sélectionne tout simplement un !
	var sbvn = bvn[Math.floor(Math.random() * bvn.length)];
	//Puis on remplace les balises {user} et {user2} par le tag du nouveau !
	sbvn = sbvn.replace(`{user}`, `<@${member.id}>`).replace(`{user2}`, `<@${member.id}>`);
	//Si on envoie pas ça va pas marcher hein !
	bchan.send(sbvn);

};