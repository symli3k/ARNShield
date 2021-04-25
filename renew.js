const Discord = require('discord.js');

module.exports = {
	run: async (message, args) => {
		let raison = args.join(' ') || 'Aucune Raison';
		let nukechannel = message.channel;
		
		if (!nukechannel.deletable) return message.reply(`\`Tu ne peux pas supprimer ce channel.\``);
		await nukechannel.clone().then( async newchannel => {
			await newchannel.setPosition(nukechannel.position)
			await newchannel.send(`Salons recrée <@!${message.author.id}>`);
			await nukechannel.delete(raison);
		});
	},
	name: 'renew'
};
