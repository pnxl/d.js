// init console
console.clear;
const print = require('./misc/helpers/print.js');
print.comment("I'm ready to serve you, senpai!~ >~<");
print.comment('If you like this bot, make sure to leave a star on GitHub!\n');

// import modules
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

// create client
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});
module.exports = client;

// create global vars
client.applicationCmd = new Collection();
client.legacyCmd = new Collection();
client.cooldowns = new Collection();

// import loaders
require('./misc/loaders/applicationCmd.js')(client, print);
require('./misc/loaders/legacyCmd.js')(client, print);
require('./misc/loaders/event.js')(client, print);

// login
client.login(process.env.secret);
