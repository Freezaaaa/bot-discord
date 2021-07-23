const Discord = require('discord.js'),
    config = require('../config.json')

const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à bannir.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send(`${member.user} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        setTimeout(() => {
            message.guild.members.unban(member)
        }, duration)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
        .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
        .addField('Utilisateur', member, true)
        .addField('Modérateur', message.author, true)
        .addField('Raison', reason, true)
        .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true))
    },
    name: 'tempban',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de bannir temporairement un utilisateur.',
        syntax: '[nom de la personne a tempban]'
    }
}