const Prism = require('./structures/Client');
const client = new Prism(process.env.DISCORD_TOKEN);
client.login();

['events'].forEach(handler => require(`./handlers/${handler}`)(client));