// Description:
//  Look up names and contact info of primary officers and
//  committee heads within the SSE
//
// Configuration:
//  SSE_API_ROOT - root to the api
//
// Commands:
//  hubot sse whois <position> - See who is a current officer position
//
// Author:
//    kristenmills, mok4ry
'use strict';

var api = require('./api')();
var Officers = api.Officers;
var Users = api.Users;

function getWhoisResponse(robot, msg, position) {
  Officers
    .all({ email: position, active: true })
    .then(function handle(body) {
      if (body.total === 0) {
        robot.send({ room: msg.envelope.user.name }, 'Unrecognized position: ' +
          position + '. `<position>` can be any of the following SSE positions:\n' +
          'president, vp, treasurer, secretary, mentoring' +
          ', projects, events, fundraising, technology, winter ball, ' +
          'pr, lab ops');
      } else {
        var officer = body.data[0];

        Users
          .one(officer.userDce)
          .then(function handleUser(userBody) {
            robot.send({ room: msg.envelope.user.name }, position + ': ' + userBody.firstName + ' ' +
              userBody.lastName);
          });
      }
    });
}

module.exports = function listener(robot) {
  var listenerMetadata = {
    id: 'sse.whois',
    help: ['hubot sse whois <position> - See who is an officer in the SSE'],
  };

  robot.respond(/sse whois (.+)/i, listenerMetadata, function handle(msg) {
    getWhoisResponse(robot, msg, msg.match[1]);
  });
};
