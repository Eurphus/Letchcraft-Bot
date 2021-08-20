const { MessageEmbed } = require('discord.js')
module.exports = async (member, channel, bot) => {
  bot.db.query(`SELECT * FROM punishments WHERE id = ${member.id}`, async (err, rows) => {
    if(err) throw err;
    let infractions=1
    if(rows.length < 1) {
      bot.db.query(`INSERT INTO punishments (id, infractions) VALUES ('${member.id}', ${0})`);
    }

    if(rows[0]) infractions = rows[0].infractions +1
    if(!infractions) infractions=1
    let message;
    console.log(infractions + rows)

    if(infractions === 1) {
      message='warning'
    }
    if(infractions === 2) {
      message='kick from the server'
      //timeout kick
     setTimeout(() => member.kick("Automated punishment | Kick | 2 infractions"), 250);
    }
    if(infractions === 3) {
      message='mute for 12h'
      require('./punishments/mute.js') (43200000, member, channel, bot)
    }
    if(infractions === 4) {
      message='mute for 48h'
      require('./punishments/mute.js') (172800000, member, channel, bot)
    }
    if(infractions === 5) {
      message='mute for 1w'
      require('./punishments/mute.js') (604800000, member, channel, bot)
    }
    if(infractions === 6) {
      message='permenent ban'
      setTimeout(() =>member.ban("Automated punishment | Perm ban | 6 infractions"), 250);
    }
    if(infractions >= 7) {
      message='permenent ban'
      setTimeout(() =>member.ban("Automated punishment | Perm ban | 7+ infraction"), 250);
    }
    //check spelling
    channel.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`<@${member.id}> has reached **${infractions}** infractions. They have received a ${message}`).setFooter("Don't end up like this guy ^"))
    member.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`You have reached **${infractions}** infractions. You have received a ${message}\n\nIf you continue to break our <#703740688625434654> more, stricter punishments may be used.`).setFooter('If you have questions regarding your punishment, please contact us by messaging this bot.'))
    setTimeout(() => bot.db.query(`UPDATE punishments SET infractions = ${infractions} WHERE id = '${member.id}'`), 1000);
  });
}
