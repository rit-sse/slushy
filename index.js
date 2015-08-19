'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function loadFiles(robot, scripts) {
  var scriptsPath = path.resolve(__dirname, 'src');
  fs.exists(scriptsPath, function cb(exists) {
    if (exists) {
      fs.readdir(scriptsPath, function cbDir(err, dir) {
        for (var i = 0; i < dir.length; i++) {
          var script = dir[i];
          if (script === 'api.js') {
            continue;
          } else if (scripts && scripts.indexOf('*') === -1) {
            if (scripts.indexOf(scripts) !== -1) {
              robot.loadFile(scriptPath, script);
            }
          } else {
            robot.loadFile(scriptsPath, script);
          }
        }
      });
    }
  });
};
