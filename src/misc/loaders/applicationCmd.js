// import modules
const { readdirSync } = require("fs");

module.exports = async (client, print) => {
  // search 4 commands
  const folders = readdirSync("./src/commands/slash");

  for (const folder of folders) {
    const files = readdirSync(`./src/commands/slash/${folder}`).filter((f) =>
      f.endsWith(".js")
    );

    for (const file of files) {
      const command = require(`../../commands/slash/${folder}/${file}`);
      client.applicationCmd.set(command.data.name, command);
      print.log(`Loaded slash command: ${command.data.name}`);
    }
  }

  // print that its done yes ok
  print.success("All slash commands have been loaded!");
};
