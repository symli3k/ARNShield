module.exports = {
    name: "lock",
    description: "lock a given channel for a particular role!",
    run: async (client, message, args) => {
        if(!message.author.hasPermission("MANAGE_CHANNELS")) return message.channel.send(ressaie)
        const channel = message.mentions.channels.first()
                  const role2 = message.guild.roles.cache.find(role => role.id === '818956412272115734') 
message.channel.updateOverwrite(role2,{ 'SEND_MESSAGES': false}) 
                

    }
}
