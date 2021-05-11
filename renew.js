const Discord =require('discord.js');

module.exports = {
	run: async (message, args) => {
		let raison = args.join(' ') || 'Aucune Raison';
		let nukechannel = message.channel;
		if (!message.guild) return message.reply(`\`Tu n'as pas le droit d'executer des commandes en DM.\``);
				if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`\`Tu n'as pas la permission de faire cette commande.\``);
		
		if (!nukechannel.deletable) return message.reply(`\`Tu ne peux pas supprimer ce channel.\``);
		await nukechannel.clone().then( async newchannel => {
			await newchannel.setPosition(nukechannel.position)
			await newchannel.send(`Salons recrée <@!${message.author.id}>`);
			await nukechannel.delete(raison);
			if (message.content.startsWith(prefix + 'renew')) {
				

		
          }

		});
	},
	name: 'renew'
};
