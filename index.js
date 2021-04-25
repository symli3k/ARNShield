const Discord = require('discord.js'),
	fs = require('fs'),
	{ token, prefix } = require('./config.json');
bot = new Discord.Client();

bot.login(token);
bot.on('ready', () => {
	console.log('connecté');
	bot.user.setActivity(`${prefix}en direct`, { type: 'STREAMING', url: 'https://twitch.tv/ARN' });
});

bot.commands = new Discord.Collection();
fs.readdir('./commands', (err, files) => {
	if (err) throw err;
	files.forEach((file) => {
		if (!file.endsWith('.js')) return;
		const command = require(`./commands/${file}`);
		bot.commands.set(command.name, command);
		console.log(`${file}`);
	});
});

bot.on('message', (message) => {
	if (message.type !== 'DEFAULT' || message.author.bot) return;

	const args = message.content.trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();
	if (!commandName.startsWith(prefix)) return;
	const command = bot.commands.get(commandName.slice(prefix.length));
	if (!command) return;
	if (command.guildOnly && !message.guild) return message.channel.send("Désolé, une erreur s'est produite.");
	command.run(message, args, bot);
});

bot.on('guildMemberAdd', (member) => {
	console.log(`${member} est arrivé`);

  let embed = new Discord.MessageEmbed()
    .setDescription(`Bienvenue à ${member}!`)
    .setColor("RANDOM")

	member.guild.channels.cache
		.find((channel) => channel.name === '💬』chat')
    .send(embed)
		//.send(`Bienvenue ${member} sur le serveur on n'est maintenant ${member.guild.memberCount}`);
	member.roles.add('818956412272115734');
});

bot.on('guildMemberRemove', (member) => {
	console.log(`${member} est parti`);
	member.guild.channels.cache
		.find((channel) => channel.id === '823192282077200455')
		.send(`${member} A quitté le serveur on n'est maintenant ${member.guild.memberCount}`);
});

// anti liens //
bot.on('message', async (message) => {
	let blacklist = [ '.com', '.fr', '.gg', '.txt', 'https://' ];

	for (let i in blacklist) {
		if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())){
      if (message.deletable) message.delete();
      message.channel.send(`Les liens sont interdits. ${message.author}!`);
    }
	}
});


bot.on('message', async message => {

  let messageArray = message.content.split(' '),
    args = messageArray.slice(1)

  // messageArray[0] messageArray[1] messageArray[2]
  if (message.content.startsWith(prefix + 'clear')) {
		if (!message.guild) return message.reply(`\`Tu n'as pas le droit d'executer des commandes en DM.\``);
		if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`\`Tu n'as pas la permission de faire cette commande.\``);

		let member = message.mentions.users.first();
		let messages = message.channel.messages.fetch();
		let count = args[0];

    if (count && count < 99 && count > 0) {
      await message.channel.bulkDelete(Number(count) + 1, true);
      message.channel.send(`${message.author} > ${count} messages suprimées `)
    } else if (member) {
      let userMessages = (await messages).filter((m) => m.author.id === member.id);
			await message.channel.bulkDelete(userMessages, true);
      message.channel.send(`${message.author} > Les messages de ${userMessages.user.tag} ont été suprimées.`)
    } else {
      await message.channel.bulkDelete(Number(99) + 1, true);
      message.channel.send(`${message.author} > 100 messages suprimées `)
    }
	}


	if (message.content === prefix + 'mrc') message.channel.send('Merci à tous ce qui rejoigne 👌');
	if (message.content === prefix + 'bvn') message.channel.send('Bienvenue sur le serveur en profite bien 😁');
	if (message.content === prefix + 'bjr')	message.channel.send('Bonjour à toi 🔰');
  if (message.content === prefix + 'mrc') message.channel.send('Merci à tous ce qui rejoigne 👌');
	if (message.content === prefix + 'gve') message.channel.send("N'hesite pas de particper au giveweay 🎉 #giveaway!");
	if (message.content === prefix + 'pub') message.channel.send('Merci à tous ce qui partage 🙃');
	if (message.content === prefix + 'ins') message.channel.send('Les insultes sont interdits sur le serveur ❌');
  if (message.content === prefix + 'spm') message.channel.send("Le spam n'est pas autoriser ⛔!");

  
  /*switch(message.content){
    case prefix + 'testt': {
      console.log('test ok!')
    }
  }*/

})