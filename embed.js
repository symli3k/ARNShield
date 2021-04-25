const { Message } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    run: (message, arg) => {
        if (!message.author.id == mod) return;
        var arg = message.content.split(" ").slice(1).join(" ");
        if (!arg) return;
        let e = new Discord.MessageEmbed()

        .setDescription(arg)
        .setColor("RANDOM")
        .setFooter("Ora Discord")

        if (message.deletable) message.delete();

        message.channel.send(e);
        console.log(`Commande embed executé par ${message.author.tag} ${message.guild.name}`)
    },
    name: 'embed'
}