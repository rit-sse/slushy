// Description:
//  Look up names and contact info of primary officers and
//  committee heads within the SSE
//
// Configuration:
//  SSE_API_ROOT - root to the api
//
// Commands:
//  hubot sse whois <position> - See all SSE lingo entries
'use strict';

var api = require('./api')();
var Officers = api.Officers;
var Users = api.Users;

function getWhoisResponse(robot, msg, position) {
  Officers
    .all({ title: position, active: true })
    .then(function handle(body) {
      if (res.body.total === 0) {
        robot.send({ room: msg.envelope.user.name }, 'Unrecognized position: ' +
          position + '. `<position>` can be any of the following SSE positions:\n' +
          'president, vice president, treasurer, secretary, mentoring' +
          ', projects, events, fundraising, technology, winter ball, ' +
          'pr, lab ops');
      } else {
        var officer = body.data[0];

        Users
          .one(officer.userDce)
          .then(function handleUser(userRes) {
            var user = userRes.body;
            robot.send({ room: msg.envelope.user.name }, position + ': ' + user.firstName + ' ' +
              user.lastName);
          });
      }
    });
}

module.exports = function listener(robot) {
  var listenerMetadata = {
    id: 'sse.whois',
    help: ['hubot sse whois <position> - See all SSE lingo entries'],
  };

  robot.respond(/sse whois (.+)/i, listenerMetadata, function handle(msg) {
    getWhoisResponse(robot, msg, msg.match[1]);
  });
};
