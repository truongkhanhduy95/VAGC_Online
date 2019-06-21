'use strict';

module.exports = function (app) {
  var remotes = app.remotes();

  remotes.options.rest = remotes.options.rest || {}
  remotes.options.rest.handleErrors = false;

  app.middleware('final', FinalErrorHandler);

  function FinalErrorHandler(err, req, res, next) {
    res.status(400).send({
      StatusCode: 400,
      Messsage: err.message,
      Data: {},
      IsSuccess: false
    }).end();
  }
};