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