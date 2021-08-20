module.exports = async (bot, oldMessage, newMessage) => {
  if(oldMessage.author.bot) return;
  if(oldMessage.guild.id !== bot.config.guildID) return;
  if(oldMessage.channel.id !== bot.config.countID) return;
  if(oldMessage.channel.lastMessage !== newMessage) return;
  bot.db.query(`SELECT * FROM counting WHERE id = ${oldMessage.guild.id}`, async (err, rows) => {
    if(err) throw err;
    let count = rows[0].count -1
    if(parseInt(oldMessage.content) !== count) return;
    if(oldMessage.id !== newMessage.channel.lastMessageID) return;
      if(newMessage.content !== count) {
        newMessage.delete()
        oldMessage.channel.send(count)
      }
  });
}
module.exports.event = {
  name: 'messageUpdate'
}
