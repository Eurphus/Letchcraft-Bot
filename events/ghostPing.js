const { MessageEmbed } = require ('discord.js')
const ms = require('ms')
module.exports = async (bot, message) => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if(message.content.includes("<@")) {
    let Mentioned = message.mentions.users.first();
    if(!Mentioned) return;
    let Offender = message.author;
    if(Offender.id === Mentioned.id) return;
    if(Date.now()-3600000 >= message.createdAt) return;

    let timeForm = ms(Date.now()-message.createdAt, {long: true})
    Mentioned.send(new MessageEmbed().setColor(bot.c).setDescription(`You have just been ghost pinged by <@${Offender.id}> (${Offender.tag}) in **${message.guild.name}**`).setFooter(`Message with ping deleted ${timeForm} ago`)).catch(err => console.log("Coundn't send ):"))
    message.channel.send(new MessageEmbed().setColor(bot.c).setDescription(`Ghost Ping detected from <@${Offender.id}> to <@${Mentioned.id}>`).setFooter(`Message with ping deleted ${timeForm} ago`))
    return;
  }
}
module.exports.event = {
  name: "messageDelete"
}
