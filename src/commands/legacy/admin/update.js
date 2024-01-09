/*
 * This is the /stats command.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2024
 * Code is licensed under MIT
 */

// Import the required modules
const si = require("systeminformation");
const { execSync } = require("child_process");
const { ButtonStyle, ButtonBuilder } = require("discord.js");
const print = require("../../../helpers/print");

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

    const response = await message.reply("Checking for any new updates...");
    execSync("git fetch", (error, stderr) => {
      if (error) {
        print.error(
          `An error occured when trying to fetch the latest commit: ${error.message}`
        );
        return response
          .edit(
            `An error occured when trying to fetch the latest commit: ${error.message}`
          )
          .catch(print.error);
      }
      if (stderr) {
        print.error(
          `An error occured when trying to fetch the latest commit: ${stderr}`
        );
        return response
          .edit(
            `An error occured when trying to fetch the latest commit: ${error.message}`
          )
          .catch(print.error);
      }
      return;
    });

    const commitLocal = execSync("git rev-parse --short HEAD").slice(0, 7);

    const commitRemote = execSync("git ls-remote").slice(0, 7);

    if (commitLocal === commitRemote) {
      return response
        .edit(
          `There are no updates! Rocky is running on the latest version. (\`${commitLocal}\`)`
        )
        .catch(print.error);
    }

    response.delete();

    message.channel.send({
      content: `There's a new update available! I am currently running on commit \`${commitLocal}\`\, but the newest commit is \`${commitRemote}\`. Would you like to update?`,
    });
  },
};
