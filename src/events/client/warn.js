// import modules
const print = require("../../misc/helpers/print.js");

module.exports = {
  name: "warn",
  execute(warn) {
    // log warn info
    print.warn(warn);
  },
};
