const { MessageEmbed } = require('discord.js')
const moment = require('moment')
module.exports = async (bot, message) => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') {
    bot.db.query(`SELECT * FROM modmail WHERE id = '${message.author.id}'`, async (err, rows) => {
      if(err) throw err;
      //console.log(rows)
      let data;

      if(rows.length < 1) {
        const guild = bot.guilds.cache.get('712758352471654473')
        let confirmation = await message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("**If you would like to open a ticket, please react to this message with :white_check_mark: within the next 5 seconds**"))
        confirmation.react('✅')
        let confirm;
        let filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id
        await confirmation.awaitReactions(filter, { time: 5000 })
        .then(async collected => {
          if(collected.size === 1) confirm=true
        });

           if(!confirm) message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("Ticket creation has been canceled!"))
           if(!confirm) return;

        let error=false
        let channel = await guild.channels.create(message.author.tag, {
          topic: `Modmail opened on ${moment.utc(Date.now()).format('dddd, MMMM Do, h:mm a')} | ${message.author.id}`,
          parent: '713927596546588739'
        }).catch(async (err) => error=err)

        if(error) {
          message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("There was an error creating your modmail, please try again or contact a staff member to fix this issue."))
          bot.channels.chache.get('713927863556112394').send(` **New bot error**\n \`\`\`${error}\`\`\` `)
          return
        }
        message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("We are creating your ticket, please wait...")).catch(async (err) => error=err)
        if(error) {
          if(!bot.guilds.cache.get(703735831659020298).members.has(message.author.id)) return;
          bot.channels.cache.get(703784231096025119).send(`<@${message.author.id}> There was a issue opening your modmail, please make sure you allow DMs from the bot.`)
        }

        message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("Your ticket has been opened, a staff member will assist you in a few moments.").setFooter('Everything you say will be visible by staff'))
        channel.send(new MessageEmbed().setColor(bot.c).setDescription(`**A new ticket has been opened**\n\n**User** ${message.author.tag}\n**User ID** ${message.author.id}\n**Time** ${moment.utc(Date.now()).format('hh:mm a')}`))
        bot.db.query(`INSERT INTO modmail (id, channel) VALUES ('${message.author.id}', '${channel.id}')`)
      } else {
        console.log('test')
        let channel = bot.channels.cache.get(rows[0].channel)
/*        if(!channel) {
          message.channel.send("Your ticket has somehow become corrupted, please create a new one.")
          bot.modmail.delete(message.author.id)
           return;
        }*/
        channel.send(`**${message.author.tag} »** ${message.content}`)
       }
    })
  }
}


    /*
    console.log(info)
    if(!info) {
      const guild = bot.guilds.get('703735831659020298')
      let error=false
      let channel = await guild.createChannel('Waiting...').catch(async (err) => error=err)
      if(error) {
        message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("There was an error creating your modmail, please try again or contact a staff member to fix this issue."))
        bot.channel.get('713927863556112394').send(` **New bot error**\n \`\`\`${error}\`\`\` `)
        return
      }
      message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("We are creating your ticket, please wait...")).catch(async (err) => error=err)
      if(error) {
        if(!bot.guilds.get(703735831659020298).members.has(message.author.id)) return;
        bot.channels.cache.get(703784231096025119).send(`<@${message.author.id}> There was a issue opening your modmail, please make sure you allow DMs from the bot.`)
      }
      channel.setName(message.author.tag)
      channel.setTopic(`Modmail opened on ${moment.utc(Date.now()).format('dddd, MMMM Do, h:mm a')} | ${message.author.id}`)
      channel.setParent('713927596546588739')

      message.channel.send(new MessageEmbed().setColor(bot.c).setDescription("Your ticket has been opened, a staff member will assist you in a few moments."))
    } else {
      let status=false;
      let channel = bot.channels.get(info.channelID)
      if(!channel) {
        message.channel.send("Your ticket has somehow become corrupted, please create a new one.")
        bot.modmail.delete(message.author.id)
         return;
      }
      channel.send(`[${moment.utc(Date.now()).format('hh:mm a')}] **${message.author.tag}** >> ${message.content}`)
     }
  }
  */

module.exports.event = {
  name: "message"
}
