'use strict';

module.exports = function (app) {
  // Init asset path
  require('./routes/asset-path')(app);
};