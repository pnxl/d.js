/*
 * This file loads the commands inside the /commands
 * folder, and then pushes it to the commands collection
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { readdirSync } = require("node:fs");
const print = require("../../helpers/print");

module.exports = async (client) => {
  // Define the path for commands folder and filter only .js files
  const cmdFile = readdirSync("./src/commands/slash/").filter((file) =>
    file.endsWith(".js")
  );

  for (const f of cmdFile) {
    const loc = `../../commands/slash/${f}`;
    const cmd = require(loc);

    if ("data" in cmd && "execute" in cmd) {
      // Pushes the command to the command collection and logs said command
      client.slashCmds.set(cmd.data.name, cmd);
      print.debug(
        `The application command \`${f}\` has been loaded successfully!`
      );
    } else {
      // If the command doesn't have a data or execute property, warn the user
      print.warn(
        `The application command at ${loc} is missing a required \`data\` or \`execute\` property.`
      );
    }

    print.log(
      `Successfully loaded ${client.commands.size} application commands.`
    );
  }
};
