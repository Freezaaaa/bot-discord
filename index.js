const { env } = require('process')

const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true ,
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    fs = require('fs')
 
client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    if (!message.member.hasPermission('MANAGE_CHANNELS') && client.db.lockedChannels.includes(message.channel.id)) return message.delete()

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})

client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})

client.on('ready', () => {
    client.user.setActivity('FineRP', {type: 'PLAYING'})
})

client.on('message', message => {
    if (message.type == 'DEFAULT'){
        if(message.channel.id == "867300866780037130"){
            message.channel.bulkDelete(1)
            message.guild.channels.create(`ticket ${message.member.displayName}`, {type: 'text'}).then(channel => {
                let category = message.guild.channels.cache.get("867881215931056148", c => c.type == "category")
                channel.setParent(category)
                let everyone = message.guild.roles.cache.get("866025433485410324")
                let support = message.guild.roles.cache.get("867302302616649739")
                let helper = message.guild.roles.cache.get("867506317824753664")
                let staff = message.guild.roles.cache.get("867302658934046791")
                
                channel.updateOverwrite(message.author,{
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                })

                channel.updateOverwrite(everyone,{
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: false
                })

                channel.updateOverwrite(support,{
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true 
                })

                channel.updateOverwrite(helper,{
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                })

                channel.updateOverwrite(staff,{
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                
                
                }).then(channel_ticket => {
                    var embed = new Discord.MessageEmbed()
                    .setTitle("Ticket")
                    .setDescription("Un support va s'occuper de vous.")
                    .setTimestamp();
                    channel_ticket.send(embed)
                })
           
            })
        
        } 

    } else {
        if(message.author.bot) return ;
        if(!message.channel.id == "867300866780037130") return ;
        if(message.channel.id == "867300866780037130"){
            
        } 
    }
})

client.on("message", async message => {
    if(message.content.startsWith('!close')){
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return
        if(message.channel.parentID == '867881215931056148'){
            message.guild.channels.cache.get(message.channel.id)
            message.channel.delete()
        }
    } 
});

client.login(process.env.TOKEN);