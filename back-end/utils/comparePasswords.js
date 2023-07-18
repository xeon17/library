const bcrypt = require("bcryptjs");

async function comparePasswords(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

module.exports = comparePasswords;
