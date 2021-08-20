module.exports = async (bot, member) => {
  if(member.guild.id !== '703735831659020298') return;
  member.roles.add("714227592558936174")
}
module.exports.event = {
  name: 'guildMemberAdd'
}
