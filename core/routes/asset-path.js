'use strict';
const ImageClassifier = require('../plugins/tensorflow/image-classifier')

module.exports = function (app) {
  let path = require('path');
  //Create extra path here..

  /**
   * LOAD TENSORFLOW MODEL
   */
  app.get('/tensorflow/mobilenet',
    async (req, res, next) => {
      // do something with req
      const result = await ImageClassifier.classify('./storage/flower.jpeg');
      res.status(200).send(result)
    }
  );
};