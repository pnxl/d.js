/*
 * This is the /stats command.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2024
 * Code is licensed under MIT
 */

// Import the required modules
const { EmbedBuilder } = require("discord.js");
const si = require("systeminformation");
const package = require("../../../../package.json");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /update
   * Aliases      : /pull
   * Description  : Pulls the latest commit from git
   * Usage        : /update
   * Cooldown     : 0
   *
   * What it does : Pulls the latest commit from git
   */

  // Define data for loader
  name: "update",
  alias: ["pull"],
  description: "Pulls the latest commit from git.",
  usage: "{cmdName}",
  cooldown: 0,

  // Execute the command asynchronously
  async execute(client, message, args) {
    await message.channel.sendTyping();

    // Get software versions
    const ver = await si.versions();

    if (ver.git === "") {
      return message.reply(
        "I couldn't update because one or more dependencies are missing. Do you have `git` and `pm2` installed?"
      );
    }

    if (ver.pm2 === "") {
      return message.reply(
        "I couldn't update because one or more dependencies are missing. Do you have `git` and `pm2` installed?"
      );
    }

    if (!process.env.PM2_HOME) {
      return message.reply(
        "I couldn't update because my process wasn't ran with `pm2`. Try terminating and then starting me with `npm run start`."
      );
    }
  },
};
