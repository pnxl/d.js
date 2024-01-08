/*
 * This is the `messageCreate` event.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { Events, Collection } = require("discord.js");
const config = require("../../config.json");
const print = require("../helpers/print");

// Export the command data for loader
module.exports = {
  /*
   * Event        : messageCreate
   * Usage        : On
   *
   * What it does : Listen for any legacy commands
   *                (with prefix defined in config)
   *                and execute command.
   */

  // Define data for loader
  name: Events.MessageCreate,
  once: false,

  // Execute the event asynchronously
  execute(message, client) {
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmdName = args[0].toLowerCase();

    // If the command doesn't exist, simply ignore
    if (!message.client.legacyCmds.has(cmdName)) return;

    const cmd =
      message.client.legacyCmds.get(cmdName) ||
      message.client.legacyCmds.find(
        (c) => c.alias && c.alias.includes(cmdName)
      );

    if (!cmd) return;

    if (cmd.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(cmd.permissions)) {
        return message.reply(
          "You don't have the permission to run this command!"
        );
      }
    }

    if (cmd.args && !args.length) {
      return message.reply(`You didn't provide any arguments!`);
    }

    const { legacyCooldowns } = message.client;

    if (!legacyCooldowns.has(cmd.name)) {
      legacyCooldowns.set(cmd.name, new Collection());
    }

    // Get current time
    const now = Date.now();

    // Get cooldown
    const timestamps = legacyCooldowns.get(cmd.name);
    const cooldown = cmd.cooldown * 1000;

    // If user has a cooldown
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldown;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return message.reply(
          `You're sending commands too fast! You can try again <t:${expiredTimestamp}:R>.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldown);

    try {
      // Try to execute the command
      cmd.execute(client, message, args);
    } catch (err) {
      // Print an error on the console if there was one
      print.error(err);
      message.reply(
        "Sorry! I've encountered an error processing your command, something inside me must've went wrong. Please try again later!"
      );
      return;
    }
  },
};
