const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.bulkDelete(1)
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('📩 **Comment ouvrir un ticket**')
            .setDescription('Pour ouvrir un ticket il suffit d envoyer un message dans ce channel')
            .setColor('#000000'))            
    },
    name: 'pom'
}
          
