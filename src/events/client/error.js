// import modules
const print = require("../../misc/helpers/print.js");

module.exports = {
  name: "error",
  execute(error) {
    // log error info
    print.error(error);
  },
};
