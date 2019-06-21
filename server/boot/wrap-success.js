'use strict';

module.exports = function (app) {
  var remotes = app.remotes();

  remotes.after('**', function (ctx, next) {
    ctx.result = {
      StatusCode: 200,
      Messsage: ctx.methodString + " success",
      Data: {},
      data: ctx.result,
      IsSuccess: true
    };

    next();
  });
};