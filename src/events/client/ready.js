// import modules
const print = require("../../misc/helpers/print.js");
const { MessageEmbed } = require("discord.js");
const cfg = require("../../../cfg.json");
const gradient = require("gradient-string");
require("colors");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // log once ready
    console.log(
      gradient.pastel(
        "\n ____                _       _ \n|  _ \\ ___  __ _  __| |_   _| |\n| |_) / _ \\/ _` |/ _` | | | | |\n|  _ <  __/ (_| | (_| | |_| |_|\n|_| \\_\\___|\\__,_|\\__,_|\\__, (_)\n	               |___/ \n"
      )
    );
    print.ready(`Logged in as ${client.user.tag}! Ready to serve Byte users!`);
  },
};
