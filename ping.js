bot.on("message", async message =>{
	if(message.content === "ping"){
		let msg = await message.channel.send("**Ping en cours...**")

		let embed = new Discord.MessageEmbed()
		.addField("**Votre ping est de : ",Math.floor(msg.createdAt - message.createdAt))
		.addField("**Ma latence est de :", bot.ws.ping)
		message.channel.send(embed)
		msg.delete()
	}
})