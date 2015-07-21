var _ = require('underscore');

var sendLingoResponse = function (api, lingo, callback) { 
    api.Lingo.all({ phrase : lingo }, function (err, res) {
        var responseBody = JSON.parse(res.text),
            returnText = '';

        if (responseBody.length === 0) {
            returnText = lingo + ' was not recognized as SSE lingo. Talk to a' +
                ' mentor or SSE officer to have it added! Type `/sse lingo ' +
                'list` to see all lingo entries.';
        } else {
            var entry = responseBody[0];
            returnText = entry.phrase + ' -- ' + entry.definition;
        }

        callback(returnText);
    });
};

var sendLingoListResponse = function (api, callback) {
    var returnText = 'Use `/sse lingo <phrase> for a definition of any of the' +
        ' following: ';

    api.Lingo.all(function (err, res) {
        var lingos = JSON.parse(res.text);
        var phrases = _.pluck(lingos, 'phrase');

        callback(returnText + phrases.join(', '));
    });
};

var api = {
    run : function (metadata, args, callback, api) {
        if (!(args && args.length)) {
            callback(this.help(true));
        } else if (args[0] === 'list') {
            sendLingoListResponse(api, callback);
        } else {
            var lingo = args.join(' ');
            sendLingoResponse(api, lingo, callback);
        }
    },

    help : function (usage) {
        if (usage) {
            return 'Type `/sse lingo list` to see all lingo entries. Type ' +
                '`/sse lingo <phrase>` for the definition of any listed ' +
                'phrases.';
        }

        return 'Look up the definitions of commonly-used phrases within the ' +
            'SSE.'
    }
};

module.exports = api;
