// init console
console.clear;
const print = require("../helpers/print.js");
print.comment("I'm ready to serve you, senpai!~ >~<");
print.comment("If you like this bot, make sure to leave a star on GitHub!\n");

// import modules
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();

// def cmd array
const cmds = [];

// search 4 commands
const folders = readdirSync("./src/commands/slash");

for (const folder of folders) {
  const files = readdirSync(`./src/commands/slash/${folder}`).filter((f) =>
    f.endsWith(".js")
  );

  for (const file of files) {
    const command = require(`../../commands/slash/${folder}/${file}`);
    cmds.push(command.data.toJSON());
    print.debug(`Pushed slash command: ${command.data.name}.js`);
  }
}

// login as bot
const rest = new REST({ version: "9" }).setToken(process.env.secret);

// push 2 d-api
(async () => {
  try {
    print.log("Attempting to register slash commands...");

    await rest.put(
      process.argv[2]
        ? Routes.applicationGuildCommands(
            process.env.client,
            process.env.server
          )
        : Routes.applicationCommands(process.env.client),
      {
        body: commands,
      }
    );

    print.ready("Successfully registered slash commands!");
  } catch (error) {
    print.error(error);
  }
})();
