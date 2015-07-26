// Description:
//   Create go links from the comfort of slack
//
// Dependencies:
//   none
//
// Configuration:
//   none
//
// Commands:
//   hubot sse link <link> <go_link> - creates a go link that shortens `link` to `go_link`
//
// Author:
//   bbesmanoff

var api = require('./api');

/**
 * Creates a go link.
 * @param {object} robot - hubot
 * @param {object} msg - the message from the robot
 * @param {string} link - the long url to shorten
 * @param {string} goLink - the short url to create
 */
var createGoLink = function (robot, msg, link, goLink) {
  var params = {
    expanded_link: link,
    go_link: goLink
  };

  api.Links.create(params, function (err, res) {
    var returnText = '';

    if (err) {
      returnText = 'an error occured trying to make the request - ' + err;
    } else {
      returnText = 'go link "' + goLink + '" successfully created';
    }

    robot.send({room: msg.envelope.user.name}, returnText);
  });
};

module.exports = function(robot) {
  robot.respond(/sse link (.*) (.*)/i, function(msg) {
    var link = msg.match[1];
    var goLink = msg.match[2];

    createGoLink(robot, msg, link, goLink);
  });
};
