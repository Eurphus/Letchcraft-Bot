module.exports = async (bot, message) => {
  if(message.author.bot) return;
  if(message.guild.id !== bot.config.guildID) return;
  if(message.channel.id !== bot.config.countID) return;
  bot.db.query(`SELECT * FROM counting WHERE id = '703735831659020298'`, (err, rows) => {
      if(rows.length < 1) {
        bot.db.query(`INSERT INTO counting (id, count, last) VALUES ('${message.guild.id}', '1', '${message.author.id}')`)
        return message.channel.send('Channel activation executed')
      } else {
        if(err) throw err;
        let number = parseInt(rows[0].count)
        if(parseInt(message.content) !== number) {
          message.channel.send(`Incorrect number! The next number is ${number}`).then(msg => msg.delete({ timeout: 4500 }))
          message.delete()
        return
        }
        let last=rows[0].last
        let next = number+1
        if(message.author.id === last) {
          message.delete()
          return message.channel.send("You may not go twice in a row!").then(msg => msg.delete({ timeout: 4500 }))
        }
        bot.db.query(`UPDATE counting SET count=${next}, last=${message.author.id} WHERE ID = '${message.guild.id}'`)
      }
  });
}
module.exports.event = {
  name: 'message'
}
