// import modules
const { readdirSync } = require("fs");

module.exports = async (client, print) => {
  // search 4 legacycmd
  const folders = readdirSync("./src/commands/legacy");

  for (const folder of folders) {
    const files = readdirSync(`./src/commands/legacy/${folder}`).filter((f) =>
      f.endsWith(".js")
    );

    for (const file of files) {
      const command = require(`../../commands/legacy/${folder}/${file}`);
      client.legacyCmd.set(command.name, command);
      print.log(`Loaded legacy command: ${command.name}.js`);
    }
  }

  // print that its done yes ok
  print.success("All legacy commands have been loaded!");
};
