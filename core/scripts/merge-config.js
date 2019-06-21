'use strict';

let ff;
ff = require('node-find-folder');
let fs = require('fs');
let path = require('path');
let distance = '../../';

function getFiles(dir, files_) {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files) {
    let name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

function ensureDirectoryExistence(filePath) {
  let dirname = path.dirname(filePath);
  if (directoryExists(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function directoryExists(path) {
  try {
    return fs.statSync(path).isDirectory();
  }
  catch (err) {
    return false;
  }
}

function writeFile(content, fileName) {
  let filePath = './server/' + fileName;
  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
}

function getFileName(path) {
  return path.substr(path.lastIndexOf('/') + 1);
}

let configFiles = getFiles('core/config');

for (let i in configFiles) {
  let coreConfig = require(distance + configFiles[i]);
  let serverFileConfigPath = 'server/' + getFileName(configFiles[i]);
  let serverConfig = fs.existsSync(serverFileConfigPath) ? require(distance + serverFileConfigPath) : {};
  writeFile(Object.assign(serverConfig, coreConfig), getFileName(configFiles[i]));
}

process.exit();
