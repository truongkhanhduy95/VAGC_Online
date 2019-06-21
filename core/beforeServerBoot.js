'use strict';

module.exports = function () {
  // Before server boot

  const fs = require('fs');
  var dirName = "./storage"

  if (!fs.existsSync(dirName))
      fs.mkdirSync(dirName);
};