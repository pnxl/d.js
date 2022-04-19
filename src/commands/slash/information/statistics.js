// import modules
const { SlashCommandBuilder } = require("@discordjs/builders");
const package = require("../../../../package.json");
const print = require("../../../misc/helpers/print.js");
const os = require("systeminformation");
const { execSync } = require("child_process");

// fucks haha get it because funcs
function progress(percent) {
  let i = 50;
  const p = percent / 100;
  const f = i - i * p;
  const x = ["["];
  while (i--) {
    x.push(i < f ? " " : "•");
  }
  return x.join("") + "]";
}

function timeconv(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("statistics")
    .setDescription("get current statistics on Penguino"),
  async execute(interaction) {
    // thonk
    await interaction.deferReply();

    let version;

    // don't show commit info if git isn't installed.
    if (!execSync("git --version").toString().includes("not")) {
      version = `v${package.version}, commit ${execSync(
        "git rev-parse --short HEAD"
      )
        .toString()
        .trim()}`;
    } else {
      print.warn(
        "git wasn't found, make sure to add git to the PATH variable to use $update and $statistics."
      );
      version = `v${package.version}`;
    }

    /*
    should fix, add to TODO.md

    let gfx;

    // check if a gpu is even present
    if ((await os.graphics()).length) {
      // if a gpu is present
      gfx = `${(await os.graphics())[0].vendor} ${
        (await os.graphics()).model
      } (${(await os.graphics())[0].vram}mb VRAM) @ ${
        (await os.graphics())[0].resolution
      } ${(await os.graphics())[0].currentRefreshRate} (via ${
        (await os.graphics())[0].connection
      })`;
    } else {
      // if not present
      gfx = "No GPUs are present!";
    }
    */

    const percentage =
      100 -
      ((await Math.round((await os.mem()).free / 1073741824)) /
        Math.round((await os.mem()).total / 1073741824)) *
        100;

    // edit the interaction to show the stats
    // prettier-ignore
    interaction.editReply(
			`**${interaction.client.user.username}'s home:**
\`\`\`
Operating System  >> ${(await os.osInfo()).distro} ${(await os.osInfo()).release} (${(await os.osInfo()).arch})
Host Name         >> ${(await os.osInfo()).hostname}
Runtime & Library >> Node.js ${process.version}, Discord.js ${package.dependencies['discord.js'].slice(1, 10)}
Running Version   >> ${version}

Computer Model    >> ${(await os.system()).manufacturer} ${(await os.system()).model}
Processor         >> ${(await os.cpu()).manufacturer} ${(await os.cpu()).brand} @ ${(await os.cpu()).speed} (${(await os.cpu()).physicalCores}c, ${(await os.cpu()).cores}t)
Memory            >> ${Math.round((await os.mem()).total / 1073741824)} GB @ ${(await os.memLayout())[0].clockSpeed} MHz

Processor Usage (across ${(await os.cpu()).cores} threads):
${progress(Math.round((await os.currentLoad()).currentLoad))} ${Math.round((await os.currentLoad()).currentLoad)}%

Memory Usage (${Math.round((await os.mem()).free / 1073741824)}GB free out of ${Math.round((await os.mem()).total / 1073741824)}GB total):
${progress(Math.round(percentage))} ${Math.round(percentage)}%

${timeconv(os.time().uptime)} and counting... ☆.。.:*・°☆
\`\`\``
		);
  },
};
