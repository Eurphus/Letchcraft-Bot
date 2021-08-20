const { MessageEmbed } = require('discord.js')
module.exports.run = async (bot, message, args) => {
  let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

  bot.db.query(`SELECT * FROM levels WHERE  id = '${member.id}'`, async (err, rows) => {
    if(err) throw err;
    if(rows.length < 1) {
      return message.channel.send(new MessageEmbed().setColor(bot.config.hex).setDescription('Level data not found for that user. This means they have not talked since levels have been implemented'))
    } else {
      let level = rows[0].level
      let xp = rows[0].xp

      let nextLevel = 20 * Math.ceil((Math.pow(1.8, level+1) - 1))
      let xpNeeded = nextLevel - xp
      message.channel.send(new MessageEmbed()
      .setColor(bot.config.hex)
      .addField('Current Level', level)
      .setDescription(`You need ${xpNeeded} (~${Math.ceil(xpNeeded / 7.5)} msgs) more xp to level up.`))
    }


  });
}
module.exports.config = {
  aliases: ['xp']
}
