const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.bulkDelete(2)
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Server Status')
            .setDescription('Server FineRP is **Online**')
            .setColor('#0ea60e'))            
    },
    name: 'on'
}