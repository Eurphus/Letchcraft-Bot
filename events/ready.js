module.exports = async (bot) => {
  console.log(`✅ ${bot.user.tag} is online.`)

  bot.user.setActivity('Message for me for help!')
}
module.exports.event = {
  name: "ready"
}
