//Description:
//  Look up the definitions of commonly-used phrases within the SSE
//
//Configuration:
//  SSE_API_ROOT - root to the api
//
//Commands:
//  hubot sse lingo list - See all SSE lingo entries
//  hubot sse lingo <phrase> - See the definition of any listed phrases

var Lingo = require('./api').Lingo;

function sendGetLingoResponse(robot, msg, lingo) {
  Lingo.all({ phrase : lingo }, function (err, res) {
    var returnText = '';

    if (res.body.data.length === 0) {
      returnText = lingo + ' was not recognized as SSE lingo. Talk to a' +
        ' mentor or SSE officer to have it added! Type `' + robot.alias +
        'sse lingo list` to see all lingo entries.';
    } else {
      var entry = res.body.data[0];
      returnText = entry.phrase + ' -- ' + entry.definition;
    }

    robot.send({ room: msg.envelope.user.name }, returnText)
  });
};

function sendGetLingoListResponse(robot, msg) {
  var returnText = 'Use `' + robot.alias + 'sse lingo <phrase>` ' +
  'for a definition of any of the following: ';

  Lingo.all(function (err, res) {
    var lingos = res.body.data;
    var phrases = lingos.map(function(lingo){ return lingo.phrase });

    robot.send({ room: msg.envelope.user.name }, returnText +
      phrases.join(', '));
  });
};

module.exports = function(robot) {
  robot.respond(/sse lingo (.+)/i, function(msg) {
    var lingo = msg.match[1];

    if(lingo === 'list') {
      sendGetLingoListResponse(robot, msg)
    } else {
      sendGetLingoResponse(robot, msg, lingo);
    }
  });
}