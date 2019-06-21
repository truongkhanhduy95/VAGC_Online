const { makeDirIfNotExist } = require('../../helper/folder-helper')
const formidable = require('formidable');

exports.uploadStorage = (StorageModel, bucket, req, res, ignoreFile = false) => {
  try {
    const {name: storageName, root: storageRoot} = StorageModel.app.dataSources.storage.settings;
   
    if (storageName === 'storage') {
      const path = `${storageRoot}/${bucket}/`;
      makeDirIfNotExist(path)
    }
  } catch (error) {
    console.log(error)
  }

  const form = new formidable.IncomingForm();
  const filePromise = new Promise((resolve, reject) => {
    //StorageModel.genThumbnail(req, res)
    StorageModel.genThumbnail(bucket, req, res, (error, file) => {
      if (error) {
        //Be careful here
        if(error.message == "No file content uploaded" && ignoreFile)
          return resolve(null)
        return reject(error)
      }
      let hostUrl = req.protocol + '://' + req.get('host');
      file.origin = hostUrl + `/${bucket}/` + file.origin;
      file.thumbnail = hostUrl + `/${bucket}/thumbnail/` + file.thumbnail;

      resolve(file);
    });
  });
  const fieldsPromise = new Promise((resolve, reject) => {
      form.parse(req, function(error, fields, files) {
        if (error) return reject(error);

        resolve(fields);
      });
    });
  return Promise.all([filePromise, fieldsPromise]);
}

