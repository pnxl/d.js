// import modules
const { readdirSync } = require("fs");

module.exports = async (client, print) => {
  // search 4 events
  const folders = readdirSync("./src/events");

  for (const folder of folders) {
    const files = readdirSync(`./src/events/${folder}`).filter((f) =>
      f.endsWith(".js")
    );

    for (const file of files) {
      const event = require(`../../events/${folder}/${file}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
        print.log(`Loaded one-time event: ${file}`);
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
        print.log(`Loaded on event: ${file}`);
      }
    }
  }

  // print that its done yes ok
  print.success("All events have been loaded!");
};
