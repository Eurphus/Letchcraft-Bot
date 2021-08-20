const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports.run = async (bot, message, args) => {
  if(message.channel.parentID !== '713927596546588739') return;
  bot.db.query(`SELECT * FROM modmail WHERE channel = '${message.channel.id}'`, async (err, rows) => {
    if(err) return message.channel.send(new MessageEmbed().setColor(bot.c).setDescription('This seems to be corrupted, no database found.'))
    if(err) throw err;

    let main = bot.guilds.cache.get('703735831659020298')
    let member = main.members.cache.get(rows[0].id);
    if(!member) return message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("I cannot DM this user, it seems as if they've left the guild."))

    member.send(new MessageEmbed().setColor(bot.c).setDescription("Your ticket has been closed by a staff member.\nIf your issue was not resolved, please reopen a ticket by messaging this bot."))
    bot.db.query(`DELETE FROM modmail WHERE channel = '${message.channel.id}'`)
    message.channel.delete('Modmail Removal')
  });
}
module.exports.config = {
  aliases: ['end']
}
