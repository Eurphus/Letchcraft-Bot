module.exports = async (bot, message) => {
  if(message.author.bot) return;
  if(message.guild.id !== bot.config.guildID) return;
  if(message.channel.id !== bot.config.countID) return;
  bot.db.query(`SELECT * FROM counting WHERE id = ${message.guild.id}`, async (err, rows) => {
    if(err) throw err;
    let count = parseInt(rows[0].count) -1;
    if(parseInt(message.content) !== count) return;
    if(message.id !== message.channel.lastMessageID) return;
    message.channel.send(count)
  });
}
module.exports.event = {
  name: 'messageDelete'
}
