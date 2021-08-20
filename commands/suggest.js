const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if(!args[0]) return message.channel.send(new MessageEmbed().setColor(bot.c).setDescription(':x: Incorrect usage, please use `!suggest <suggestion>`'))
  if(args.length <= 3) return message.channel.send(new MessageEmbed().setColor(bot.c).setDescription('Your suggestion must contain more arguments!'))
  let channel = bot.channels.cache.get('703795685182537840')

  let suggestion = await channel.send(
    new MessageEmbed()
    .setColor(bot.c)
    .setTitle("Letchcraft Suggestions").setDescription("```" + args.slice(0).join(" ") + "```").setFooter(`Suggestion by ${message.author.tag}`, message.author.displayAvatarURL({imageURL: true})).setTimestamp(Date.now()))
  suggestion.react('✅')
  suggestion.react('❌')

  message.channel.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`${bot.config.check} Your suggestion is live at <#703795685182537840>`))


}
