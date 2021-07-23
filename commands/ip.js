const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.bulkDelete(1)
        if (!message.member.hasPermission('MANAGE_GUILD')) return
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('📌  **Comment se connecter au serveur**  📌')
            .setDescription('- Sur FiveM dans votre console F8 mettez ceci: connect 87.98.158.45:31965')
            .setColor('#000000'))            
    },
    name: 'ip'
}
          
