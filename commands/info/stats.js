const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const moment = require('moment')

module.exports.run = async (bot, message, args, settings) => {

  let pingCheck = await message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("Checking Ping, one second..."))
  let cpu = Math.round(process.cpuUsage().system / 1024 / 1024 * 10) / 10;
  let cpup = Math.round((cpu) / 1000) / 10;

  let ram = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 10) / 10;
  let ramp = Math.round((ram / 512) * 1000) / 10;

  let info = new MessageEmbed().setColor(bot.c).setDescription(`\`\`\`Bot Stats\`\`\`
    • **Guilds** \`${bot.guilds.size}\`
    • **Total Cached Users** \`${bot.users.size}\`
    • **Total Channels** \`${bot.channels.size}\`
    • **Date Created** \`${bot.user.createdAt}\`

    \`\`\`Hosting Stats\`\`\`
    • **Uptime** \`Last Restarted at ${moment.utc(bot.readyAt).format('dddd, MMMM Do YYYY, HH:mm')}\` - \`${ms(bot.uptime, {long: true})} Ago\`
    • **API Latency** \`${bot.ping}ms\`
    • **Bot Ping** \`${pingCheck.createdTimestamp - message.createdTimestamp}ms\`
    • **CPU** \`${cpu} - ${cpup}%\`
    • **Ram** \`${ram}MB/512MB - ${ramp}%\`
     `)

     pingCheck.edit(info)
}
