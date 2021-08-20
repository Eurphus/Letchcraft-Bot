const { MessageEmbed } = require('discord.js')
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('BAN_MEMBERS')) return;
  if(args[0]) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send('You must mention a member!');
    //if(member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed().setColor(bot.c).setDescription(`${bot.config.x} You may not punish this user`))
    require('../../functions/punishment.js') (member, message.channel, bot)
  } else {
    return message.channel.send(new MessageEmbed().setColor(bot.c).setDescription(`${bot.config.x} **Incorrect Syntax, Use:** \`!punish <@user>\``))
  }
}
