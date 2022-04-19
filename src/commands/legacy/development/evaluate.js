// import modules
const { MessageEmbed } = require("discord.js");
const print = require("../../../misc/helpers/print.js");
const cfg = require("../../../../cfg.json");
const { inspect } = require("util");

module.exports = {
  name: "evaluate",
  aliases: ["eval", "ev", "js", "exec", "ex", "code", "execute"],
  hidden: true,
  async execute(message, args) {
    // why the fuck is this function async
    // eslint-disable-next-line no-unused-vars
    async function send(content) {
      message.channel.send(content);
    }

    // if no args and not jason spit error in console
    if (!args.length && message.author.id !== cfg.info.owner.id) {
      message.delete();
      print.error(
        "A user attempted to run evaluate! Make sure to remove evaluate before getting Penguino ready for production!"
      );
      return message.reply("You did not provide any arguments!").then((m) => {
        setTimeout(() => m.delete(), 2500);
      });
    }

    if (message.author.id === cfg.info.owner.id) {
      // actual eval code
      print.warn(
        `'${message.author.tag}' ran evaluate at <#${
          message.channel.id
        }> and ran:\n            ${args.join(" ")}`
      );
      print.warn(
        "If this is intentional, you may ignore this warning. Make sure to remove evaluate before getting Penguino ready for production!"
      );

      message.delete();

      const snippet = args.join(" ");

      let res;
      try {
        res = eval(snippet);
        res = inspect(res, { depth: 0 });
      } catch (error) {
        res = inspect(error, { depth: 0 });
      }

      const embed = new MessageEmbed()
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.displayAvatarURL(),
        })
        .setColor(cfg.embed.colour)
        .setTitle("Evaluation")
        .addField("Code snippet", `\`\`\`js\n${snippet.slice(0, 1015)}\`\`\``)
        .addField("Node.js results", `\`\`\`js\n${res.slice(0, 1015)}\`\`\``)
        .setFooter({
          text: `Running Node.js ${process.version}`,
        })
        .setTimestamp();

      message.channel.send({ embeds: [embed] }).then((m) => {
        setTimeout(() => m.delete(), 5000);
      });
    } else {
      // if not jason spit error in console
      message.delete();
      message.channel
        .send("You do not have permission to use that command!")
        .then((m) => {
          setTimeout(() => m.delete(), 2500);
        });
      print.error(
        "A user attempted to run evaluate! Make sure to remove evaluate before getting Penguino ready for production!"
      );
    }
  },
};
