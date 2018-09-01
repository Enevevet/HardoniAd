
/*                                                                          dddddddd                                                                                     dddddddd
  HHHHHHHHH     HHHHHHHHH                                                 d::::::d                                     iiii                 AAA                        d::::::d
  H:::::::H     H:::::::H                                                 d::::::d                                    i::::i               A:::A                       d::::::d
  H:::::::H     H:::::::H                                                 d::::::d                                     iiii               A:::::A                      d::::::d
  HH::::::H     H::::::HH                                                 d:::::d                                                        A:::::::A                     d:::::d 
    H:::::H     H:::::H    aaaaaaaaaaaaa  rrrrr   rrrrrrrrr       ddddddddd:::::d    ooooooooooo   nnnn  nnnnnnnn    iiiiiii            A:::::::::A            ddddddddd:::::d 
    H:::::H     H:::::H    a::::::::::::a r::::rrr:::::::::r    dd::::::::::::::d  oo:::::::::::oo n:::nn::::::::nn  i:::::i           A:::::A:::::A         dd::::::::::::::d 
    H::::::HHHHH::::::H    aaaaaaaaa:::::ar:::::::::::::::::r  d::::::::::::::::d o:::::::::::::::on::::::::::::::nn  i::::i          A:::::A A:::::A       d::::::::::::::::d 
    H:::::::::::::::::H             a::::arr::::::rrrrr::::::rd:::::::ddddd:::::d o:::::ooooo:::::onn:::::::::::::::n i::::i         A:::::A   A:::::A     d:::::::ddddd:::::d 
    H:::::::::::::::::H      aaaaaaa:::::a r:::::r     r:::::rd::::::d    d:::::d o::::o     o::::o  n:::::nnnn:::::n i::::i        A:::::A     A:::::A    d::::::d    d:::::d 
    H::::::HHHHH::::::H    aa::::::::::::a r:::::r     rrrrrrrd:::::d     d:::::d o::::o     o::::o  n::::n    n::::n i::::i       A:::::AAAAAAAAA:::::A   d:::::d     d:::::d 
    H:::::H     H:::::H   a::::aaaa::::::a r:::::r            d:::::d     d:::::d o::::o     o::::o  n::::n    n::::n i::::i      A:::::::::::::::::::::A  d:::::d     d:::::d 
    H:::::H     H:::::H  a::::a    a:::::a r:::::r            d:::::d     d:::::d o::::o     o::::o  n::::n    n::::n i::::i     A:::::AAAAAAAAAAAAA:::::A d:::::d     d:::::d 
   H::::::H     H::::::HHa::::a    a:::::a r:::::r            d::::::ddddd::::::ddo:::::ooooo:::::o  n::::n    n::::ni::::::i   A:::::A             A:::::Ad::::::ddddd::::::dd
  H:::::::H     H:::::::Ha:::::aaaa::::::a r:::::r             d:::::::::::::::::do:::::::::::::::o  n::::n    n::::ni::::::i  A:::::A               A:::::Ad:::::::::::::::::d
  H:::::::H     H:::::::H a::::::::::aa:::ar:::::r              d:::::::::ddd::::d oo:::::::::::oo   n::::n    n::::ni::::::i A:::::A                 A:::::Ad:::::::::ddd::::d
  HHHHHHHHH     HHHHHHHHH  aaaaaaaaaa  aaaarrrrrrr               ddddddddd   ddddd   ooooooooooo     nnnnnn    nnnnnniiiiiiiiAAAAAAA                   AAAAAAAddddddddd   ddddd
*/


//On requiert le module discord.js c'est la base du bot
const Discord = require(`discord.js`);
//On crée le client Discord cela représente notre Bot (souvent appelé bot justement)
const client = new Discord.Client({ fetchAllMembers: true });
//On requiert le fichier config, c'est ici que se trouve notre prefix et notre token (secret :p)
const config = require(`./config.json`);
//FileSystem est un module qui permet de modifier des fichiers à partir du code, quasi-obligatoire pour les command handlers
const fs = require(`fs`);

//Ici, le module de base de données !!
const Enmap = require(`enmap`);

//On crée une table pour les profiles et une table pour les bans ! (On les rattache au client pour qu'ils soient accessibles de partout !)
client.profiles = new Enmap({ name: `profiles` });
client.banned = new Enmap({ name: `banned` });
client.prefixes = new Enmap({ name: `prefixes` });

//Cela va nous servir pour le cooldown des commandes de pub ! 
client.talkedRecently = new Set();

//Petite folie !
client.admins = [`329669021043523594`, `376812375795302402`];
client.em = {
	d: "<:done:473803590532595712>", //done
	e: "<:nope:473803719440597003>", //error
	f: "<:outils:464228811416797184>" //fix
}

//Ici grâce au FS (FileSystem) on demande à notre code que lorsqu'un event advient, qu'il fouille dans le dossier "events" et qu'il ouvre le fichier qui a un nom correspondant !
fs.readdir(`./events/`, (e, files) => {
	if (e) return console.error(e);
	files.forEach(file => {
		let eF = require(`./events/${file}`);
		let eN = file.split(`.`)[0];
		client.on(eN, (...args) => eF.run(client, ...args));
	});
});

/*C'est à l'aide de ces deux collections Discord que nous allons pouvoir "charger" nos commandes
(s'assurer quà première vue elles ne contiennent pas d'erreur) et ensuite les reload, les run !*/
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.modules = [];

//Pareil qu'en haut sauf que là c'est le tour des commandes !
fs.readdir(`./commands/`, (e, folders) => {
	//On sait jamais si on a pas le droit d'ouvrir le dossier commands :
	if (e) console.error(e);
	//Ici on regarde combien de modules existent, c.à.d combien y'a-t-il de sous-dossiers
	console.log((`${folders.length} modules disponibles.`));
	//Alors là on va ouvrir chaque dossiers !
	folders.forEach(folder => {
		client.modules.push(folder);
		fs.readdir(`./commands/${folder}`, (e, files) => {
			if (e) console.error(e);
			//Et là hophophop ! Voici le nombres de files qu'il y a dans le modules !
			console.log((`\n${files.length} commandes ${folder}.`));
			//Alors maintenant on va ouvrir chaque fichier !
			files.forEach(file => {
				if (file === `module.js`) return
				let props = require(`./commands/${folder}/${file}`);
				//Si on arrive là : Pas d'erreur ! C'est fantastique !
				console.log(`   ${props.help.name} chargé.`);
				//Et on ajoute notre petite commande dans notre collection !
				client.commands.set(props.help.name, props);
				//alors là on va aller fouiller dans chaque exports.conf de nos commandes pour faire une collection des alias !
				props.conf.aliases.forEach(alias => {
					client.aliases.set(alias, props.help.name);
				});
			});
		});
	});
});

//Si UN JOUR on rencontre un erreur :
client.on(`error`, console.error);
//On même un simple avertissement :
client.on(`warn`, console.warn);

//Très utile (sinon le bot va pas se connecter sur son compte Discord quoi xD)
client.login(config.token);

//Juste pour faire 100 lignes ;)