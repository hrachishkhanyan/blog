var express = require('express');
var bodyParser = require('body-parser');
module.exports = express().use(bodyParser.json());
