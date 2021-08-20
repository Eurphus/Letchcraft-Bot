const { MessageEmbed } = require('discord.js')
module.exports.run = async (bot, message, args) => {
  bot.db.query(`SELECT * FROM levels`, async (err, rows) => {
    if(err) throw err;
    //Array if not proper?
    const sorted = rows.sort((a,b) => b.level - a.level)
    const top = sorted.splice(0, 10)
    let num = 1;
    let topMsg;
    for(const data of top) {
      topMsg+=`**${num}. <@${data.id}>** Level \`${data.level}\` with \`${data.xp}\` xp\n`
      num++
    }
    topMsg=topMsg.replace('undefined', '')
    message.channel.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`**Levels leaderboard**\n` + topMsg))
  });
}
