const { RichEmbed } = require('discord.js')
module.exports = async (bot, message) => {

  if(message.author.bot) return;
  if (message.channel.type !== 'text') return;

  let prefix = bot.config.prefix
  if(!message.content.startsWith(prefix)) prefix = `<@${bot.user.id}>`
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  var command;

  if (bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    command = bot.commands.get(bot.aliases.get(cmd));
  }
  if(!command) return;


  if(!message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) {
    let embed = new RichEmbed().setColor(bot.config.defaultEmbedColor).setDescription("Sorry, but I do not have permission to send messages in <#" + message.channel.id + ">, please try another channel or contact one of your guild managers to fix this issue.")
    message.author.send(embed).catch()
    return;
  }

  command.run(bot, message, args)

}

module.exports.event = {
  name: "message"
}
