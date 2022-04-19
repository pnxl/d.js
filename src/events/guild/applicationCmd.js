// import modules
const print = require("../../misc/helpers/print.js");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    // if interaction not command ignore
    if (interaction.isCommand()) {
      // see if the command exists within collection
      const command = client.applicationCmd.get(interaction.commandName);
      if (!command) return;

      try {
        // try 2 execute
        await command.execute(interaction);
      } catch (error) {
        // if it errors, well then it errors lmao
        print.error(error);
        await interaction.reply({
          content: "There was an error while executing that command!",
          ephemeral: true,
        });
      }
    }
  },
};
