const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.bulkDelete(1)
        message.channel.send("f8 connect 87.98.158.45:31965")
    },
    name: 'connecter'
}