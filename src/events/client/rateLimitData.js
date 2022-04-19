// import modules
const print = require("../../misc/helpers/print.js");

module.exports = {
  name: "rateLimitData",
  execute(rateLimitData) {
    // log rate limit
    print.error(
      `I've been rate limited.\n            Here's why: ${rateLimitData.reason}`
    );
  },
};
