const { RichEmbed } = require('discord.js')
const { utc } = require('moment')

module.exports.run = async (bot, message, args) => {
  if(message.channel.parentID !== '713927596546588739') return;
  bot.db.query(`SELECT * FROM modmail WHERE channel = '${message.channel.id}'`, async (err, rows) => {
    if(err) return message.channel.send(new RichEmbed().setColor(bot.c).setDescription('This seems to be corrupted, no database found.'))
    if(err) throw err;


    let main = bot.guilds.cache.get('703735831659020298')

    let member = main.members.cache.get(rows[0].id);
    if(!member) return message.channel.send(new RichEmbed().setColor(bot.c).setDescription("I cannot DM this user, it seems as if they've left the guild."))

    if(!args[0]) return message.channel.send(new RichEmbed().setColor(bot.c).setDescription("Please supply something to dm this user."))

    message.delete()
    let highest = message.member.roles.highest.name
    if(highest === '*') highest='Upper Management'
    message.channel.send(`**${highest}** **${message.author.tag}** » ${args.slice(0).join(" ")}`)
    member.user.send(`**${highest}** **${message.author.tag}** » ${args.slice(0).join(" ")}`)
  });
}
module.exports.config = {
  aliases: ['r']
}
