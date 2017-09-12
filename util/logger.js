var Logger = require('le_node');

var log = new Logger({
  token:process.env.LOGENTRIES_TOKEN
});

module.exports = log;
