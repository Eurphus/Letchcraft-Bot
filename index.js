const fs = require('fs')
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});
const config = require('./config')

const mysql = require('mysql')
var db = mysql.createConnection({
  host: config.sql.host,
  port: config.sql.port,
  user: config.sql.user,
  password: config.sql.password,
  database: config.sql.database,
  multipleStatements: true
});

db.connect(err => {
  if(err) throw err;
  console.log('Connection Established')
  //db.query("SHOW TABLES", console.log)
})

 bot.config = config
 bot.commands = new Discord.Collection()
 bot.aliases = new Discord.Collection()
 bot.c = config.hex
 bot.db = db


// Load Commands
const loadCommands = module.exports.loadCommands = (dir = "./commands/") => {
    fs.readdir(dir, (error, files) => {
        if (error) return console.log(error);

        files.forEach((file) => {
            if (fs.lstatSync(dir + file).isDirectory()) {
                loadCommands(dir + file + "/");
                return;
            }

            delete require.cache[require.resolve(`${dir}${file}`)];

            let props = require(`${dir}${file}`);

            bot.commands.set(file.split('.')[0], props);
            console.log(`📝 Command [${file.split('.')[0]}] has been loaded.`)

            if (props.config) {
              if(props.config.aliases) props.config.aliases.forEach(alias => {
                bot.aliases.set(alias, file.split('.')[0]);
            });
          }
        });
    });
};

// Load Events
const loadEvents = module.exports.loadCommands = (dir = "./events/") => {
    fs.readdir(dir, (error, files) => {
        if (error) return console.log(error);

        files.forEach((file) => {
            if (fs.lstatSync(dir + file).isDirectory()) {
                loadEvents(dir + file + "/");
                return;
            }

            delete require.cache[require.resolve(`${dir}${file}`)];

            let props = require(`${dir}${file}`);
            bot.on(props.event.name, props.bind(null, bot));
            console.log(`🔧 Event [${file.split('.')[0]}] has been loaded.`);
        });
    });
};
loadEvents();
loadCommands();

bot.login(bot.config.token);
