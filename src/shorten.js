// Description:
//   Create go links from the comfort of slack
//
// Dependencies:
//   none
//
// Configuration:
//   SLACK_SECRET - secret for authentication with the SSE api
//   SSE_API_ROOT - root to the api
//
// Commands:
//   hubot sse link <link> <go_link> - creates a go link that shortens `link` to `go_link`
//
// Author:
//   bbesmanoff, kristenmills

'use strict';

/**
 * Creates a go link.
 * @param {object} robot - hubot
 * @param {object} msg - the message from the robot
 * @param {string} link - the long url to shorten
 * @param {string} goLink - the short url to create
 */
function createGoLink(robot, msg, link, goLink) {
  var api = require('./api')();
  var Links = api.Links;
  var Auth = api.Auth;

  var params = {
    longLink: link,
    shortLink: goLink,
  };

  var match = msg.envelope.user.email_address.match(/^([a-z]{2,3}\d{4})@rit\.edu$/);
  if (match) {
    return Auth
      .getToken('slack', match[1], process.env.SLACK_SECRET)
      .then(function handle() {
        return Links.create(params);
      })
      .then(function handle(body) {
        robot.send({ room: msg.envelope.user.name }, 'go link "' + body.shortLink + '" successfully created');
      })
      .catch(function errHandle(err) {
        robot.send({ room: msg.envelope.user.name }, 'an error occured trying to make the request - ' + err.message);
      });
  }

  return robot.send({ room: msg.envelope.user.name }, 'To perform this command, you need to use your RIT email. Change it on slack and try running this command again');
}

module.exports = function listener(robot) {
  var listenerMetadata = {
    id: 'sse.shorten',
    help: ['hubot sse link <link> <go_link> - creates a go link that shortens `link` to `go_link`'],
  };
  robot.respond(/sse shorten (.*) (.*)/i, listenerMetadata, function handle(msg) {
    var link = msg.match[1];
    var goLink = msg.match[2];

    createGoLink(robot, msg, link, goLink);
  });
};
