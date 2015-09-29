'use strict';

module.exports = function listener(robot) {

  robot.respond(/sse tip me/, function handle(msg) {
    var Tips = require('./api')().Tips;

    Tips
      .all()
      .then(function p(tips) {
        var tip = robot.random(tips);

        robot.send({ room: msg.envelope.user.name }, tip);
      });
  });
};
