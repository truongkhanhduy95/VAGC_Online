'use strict';

// Before server boot
require('../core/beforeServerBoot')();

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  console.log("Environment: " + process.env.NODE_ENV)

  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  /**
   * ON BOOT EVENT
   */
  require('../core/onServerBoot')(app);

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// After server boot
require('../core/afterServerBoot')(app);
