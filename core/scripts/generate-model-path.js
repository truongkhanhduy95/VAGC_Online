'use strict';

let ff;
ff = require('node-find-folder');
let fs = require('fs');
let distance = '../../';

function arrayUnique(array) {
  let a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
}

let modelPaths = new ff('models', {nottraversal: ['client', 'common', 'server', 'storage', 'node_modules', '.git']});
for (let i in modelPaths) {
  modelPaths[i] = '../' + modelPaths[i];
}
let coreModelConfigPath = 'core/config/model-config.json';
let coreModelConfig = require(distance + coreModelConfigPath);

coreModelConfig._meta.sources = arrayUnique(coreModelConfig._meta.sources.concat(modelPaths));
fs.writeFileSync(coreModelConfigPath, JSON.stringify(coreModelConfig, null, 2), 'utf-8');

process.exit();