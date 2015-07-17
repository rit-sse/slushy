var data = require('./lingo.json');

var api = {
    run : function (metadata, args) {
        var returnText = '';

        if (!(args && args.length)) {
            returnText = this.help(true);
        } else if (args[0] === 'list') {
            returnText = 'Use `/sse lingo <phrase>` for a definition of any ' +
                'of the following: ' + Object.keys(data.lingo).join(', ');
        } else {
            var lingo = args.join(' ');
            
            if (!data.lingo[lingo]) {
                returnText = lingo + ' was not recognized as SSE lingo. Talk' +
                    ' to a mentor or SSE officer to have it added! Type ' +
                    '`/sse lingo list` to see all lingo entries.';
            } else {
                returnText = lingo + ' -- ' + data.lingo[lingo];
            }
        }

        return returnText;
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
