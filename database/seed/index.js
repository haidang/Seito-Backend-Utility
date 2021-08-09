const roles = require("./role.seed");
const accounts = require("./account.seed");

async function dbSeed() {
  await roles();
  await accounts();
}

module.exports = dbSeed;
