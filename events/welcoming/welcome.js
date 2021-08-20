const { MessageEmbed } = require('discord.js')
module.exports = async (bot, member) => {
  if(member.guild.id !== '703735831659020298') return;
  let channel = member.guild.channels.cache.get('714233617827758160')

  channel.send(`<@${member.id}>`).then(msg => msg.delete({ timeout: 2000 }))
  channel.send(new MessageEmbed()
  .setColor(bot.c)
  .setDescription(`**Welcome to LetchCraft ${member.user.tag}!**\n\nPlease make sure to read our <#703740688625434654> channel!\nMake sure to read our <#703740724369162280> channel in order to get information regarding our server\n\n**Links**\n**Official Discord Link** https://discord.gg/yKpeQCC\n**Website** https://letchcraft.net\n**Server IP** play.letchcraft.net`))
}
module.exports.event = {
  name: 'guildMemberAdd'
}
