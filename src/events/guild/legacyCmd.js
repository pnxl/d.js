// import modules
const print = require("../../misc/helpers/print.js");
const cfg = require("../../../cfg.json");
const { Collection } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    // if message is not from a guild, doesn't start with the prefix, or is from a bot ignore
    if (
      !message.content.startsWith(cfg.app.prefix) ||
      message.author.bot ||
      message.channel.type === "dm"
    ) {
      return;
    }

    // get arguments
    const args = message.content
      .slice(cfg.app.prefix.length)
      .trim()
      .split(/ +/);
    const command = args.shift().toLowerCase();

    // check 4 aliases
    const cmd =
      client.legacyCmd.get(command) ||
      client.legacyCmd.find((c) => c.aliases && c.aliases.includes(command));

    // if command not found, ignore
    if (!cmd) return;

    // see if user has needed perms
    if (cmd.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(cmd.permissions)) {
        return message.reply(
          "You have insufficient permissions to use that command!"
        );
      }
    }

    // see if args are required
    if (cmd.args && !args.length) {
      let reply = "You provided an invalid syntax!";

      if (cmd.usage) {
        reply += `\nProper syntax is: \`${cfg.app.prefix}${command} ${cmd.usage}\``;
      }

      return message.reply(reply);
    }

    // see if it has cooldowns
    const { cooldowns } = client;

    if (!cooldowns.has(cmd.name)) {
      cooldowns.set(cmd.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(cmd.name);
    const cooldownAmount = (cmd.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `You are on cooldown! Please wait ${timeLeft.toFixed(
            1
          )} before using this command again!`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      // finally try 2 execute
      cmd.execute(message, args);
    } catch (error) {
      // if it errors, well then it errors lmao
      print.error(error);
      message.reply("There was an error while executing that command!");
    }
  },
};
