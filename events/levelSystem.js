const { MessageEmbed } = require('discord.js')
module.exports = async (bot, message) => {

  if(message.author.bot) return;
  if(message.guild.id !== '703735831659020298') return

  bot.db.query(`SELECT * FROM levels WHERE id = ${message.author.id}`, (err, rows) => {
    if(err) throw err;
    if(rows.length < 1) {
      return bot.db.query(`INSERT INTO levels (id, xp, level) VALUES (${message.author.id}, ${0}, ${1})`)
    } else {
      let xp = rows[0].xp
      let level = rows[0].level
      let generatedXp = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
      bot.db.query(`UPDATE levels SET xp = ${xp + generatedXp} WHERE id = '${message.author.id}'`);

      let nextLevel = 20 * Math.ceil((Math.pow(1.8, level+1) - 1))
      if(xp >= nextLevel) {
        bot.db.query(`UPDATE levels SET level='${level+1}', xp=${0} WHERE ID = '${message.author.id}'`)
        return message.channel.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`<@${message.author.id}> you have leveled up to level ${level+1}!`))
      }
      return;
    }
  });


}

module.exports.event = {
  name: "message"
}
