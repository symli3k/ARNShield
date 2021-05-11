module.exports = {
	run: async (message, args) => {
		if (message.content.startsWith(prefix + 'clear')) {
			if (!message.guild) return message.reply(`\`Tu n'as pas le droit d'executer des commandes en DM.\``);
			if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`\`Tu n'as pas la permission de faire cette commande.\``);
		
        const member = message.mentions.members.first()
		if (!member) return message.channel.ssend('Veuillez mentionnez le membre à exclure.')
		if (member.id === message.guild.ownerID) return message.channel.send('**Vous ne pouvez pas exclure le propiétaire du serveur.**')
		if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('**Vous ne pouvez pas exclure.**')
		if (!message.kickable) return message.channel.send('**Le bot ne peut pas exclure ce membre.**')
		const reason = args.slice(1).join(' ') || 'Ancune raison fournie'
		await member.kick(reason)
		message.channel.send(`$(member.user.tag) **a été exclu !**`)
	 }
 	},
name: 'kick'
 
};
