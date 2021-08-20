const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const { utc } = require('moment')
module.exports = async (time, member, channel, bot) => {
  let muteRole =  member.guild.roles.cache.get(bot.config.muteID)
  if(!muteRole) return channel.send('Critical Error, mute role not found')
  time=parseInt(time);
  //convert time to integer
  if(!time) return channel.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`:x: The provided time \`${time}\` seems to be invalid, or it is not an valid integer. Please check your arguments`).setFooter('Is this an error? Please report to Eurphus#5650 right away'));
  //if(member.roles.cache.highestRole.weight > muteRole.weight) channel.send('That ')
  //check weight and highest Role documentation, likely wrong
  bot.db.query(`SELECT * FROM mutes WHERE id = '${member.id}'`, (err, rows) => {
    if(err) throw err;
    if(rows.length < 1) {
      bot.db.query(`INSERT INTO mutes (id, time) VALUES ('${member.id}', ${time+Date.now()})`)
      console.log(`${time}\n${Date.now()}\n\n${time+Date.now()}`)
      member.roles.add(muteRole.id)
      channel.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`${bot.config.check} <@${member.id}> has been successfully muted for ${ms(time, {long: true})}`))//check spelling
      return member.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`You have been muted for ${ms(time, {long: true})}. Your mute will expire on ${utc(Date.now()+time).format('dddd, MMMM Do, h:mm a')}`))
    } else {
      bot.db.query(`UPDATE mutes SET time = ${rows[0].time + time} WHERE id = '${member.id}'`);
      channel.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`${bot.config.check} <@${member.id}> has been successfully muted. User already had an existing mute, and it has been extended by another ${ms(time, {long:true})}.`))
      member.send(new MessageEmbed().setColor(bot.config.hex).setDescription(`You have been muted for ${ms(time, {long: true})}. Since you already have an active mute, your mute has been extended by ${ms(time, {long: true})}.`))
    }
  });
}
