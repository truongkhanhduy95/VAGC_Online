'use strict';

module.exports = function(app) {

  // delete app.models.User.validations.username;
  // app.dataSources.storage.connector.getFilename = function (file, req, res) {
  //   //file.name is original filename uploaded
  //   var fileExtension = '.' + file.name.split('.').pop()
  //   var filename = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension
  //   return filename;
  // }

  var mysql = app.dataSources.GermanShepherdDataSource;
  console.log('Migrating database.....');
  var defaultModel = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
  console.log('-- Models found:', Object.keys(app.models));
  console.log('-- Default Models will not be migrated:', defaultModel);
  for (var model in app.models) {
    if (defaultModel.indexOf(model) < 0) {
      mysql.isActual(model, function(err, actual) {
        if (actual) {
          console.log('Model ' + model + ' is up-to-date. No auto-migrated.');
        } else {
          console.log('Difference found! Auto-migrating model ' + model + '...');
          mysql.autoupdate(model, function() {
            console.log('Auto-migrated model ' + model + ' successfully.');
          });
        }
      });
    }
  }
};