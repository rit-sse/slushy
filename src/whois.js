//Description:
//  Look up names and contact info of primary officers and
//  committee heads within the SSE
//
//Configuration:
//  SSE_API_ROOT - root to the api
//
//Commands:
//  hubot sse whois <position> - See all SSE lingo entries

var api = require('./api');
var Officers = api.Officers;
var Members = api.Members

function getWhoisResponse(robot, msg, position) {
  Officers.all({ title : position }, function (err, res) {
    if (res.body.length === 0) {
      robot.send({ room: msg.envelope.user.name }, 'Unrecognized position: ' +
        position + '. `<position>` can be any of the following SSE positions:\n' +
        'president, vice president, treasurer, secretary, mentoring' +
        ', projects, events, fundraising, technology, winter ball, ' +
        'pr, lab ops');
    } else {
      var officer = res.body[0];

      Members.one(officer.member_id, function (err, res) {
        var member = res.body;

        robot.send({ room: msg.envelope.user.name }, position + ': ' + member.first_name + ' ' +
          member.last_name);
      });
    }
  });
}

module.exports = function(robot) {
  robot.respond(/sse whois (.+)/i, function(msg) {
    getWhoisResponse(robot, msg, msg.match[1]);
  });
}