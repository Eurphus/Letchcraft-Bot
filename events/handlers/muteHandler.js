const { MessageEmbed } = require('discord.js')
module.exports = async  (bot) => {
  bot.setInterval(async () => {
    bot.db.query(`SELECT * FROM mutes`, async (err, rows) => {
      if(err) throw err;
      for(const data of rows) {
        let member = bot.guilds.cache.get(bot.config.guildID).members.cache.get(data.id)
        if(data.time < Date.now()) {//get id
          console.log(Date.now() + `\n${data.time}`)
          member.roles.remove(bot.config.muteID)// role
          member.send(new MessageEmbed().setColor(bot.config.hex).setDescription('You have been unmuted. You now have access to speak in our channels.').setFooter('Please follow our rules so this never happens again!'))
          bot.db.query(`DELETE FROM mutes WHERE id = ${data.id}`);
          console.log('Unmute executed!')
        } else {
          if(!member.roles.cache.has(bot.config.muteID)) return members.roles.add(bot.config.muteID)
        }
      }
    });
  }, 10000)
}
module.exports.event = {
  name: 'ready'
}
