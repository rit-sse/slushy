// until we get DB stuff figured out
var data = require('./whois.json');

var api = {
    run : function (metadata, args) {
        var position = args.join(' '),
            returnText = '';

        if (data[data.CURRENT_TERM][position]) {
            returnText = data[data.CURRENT_TERM][position]
        } else {
            returnText = 'Unrecognized position: ' + position +
                '. Type `/sse help whois` to see all positions.';
        }

        return returnText;
    },

    help : function (usage) {
        if (usage) {
            return '```/sse whois <position>``` ' +
                '`<position>` can be any of the following SSE positions:\n' +
                'president, vice president, treasurer, secretary, mentoring' +
                ', projects, events, fundraising, technology, winter ball, ' +
                'pr, lab ops';
        }

        return 'Look up names and contact info of primary officers and ' +
            'committee heads within the SSE';
    }
};

module.exports = api;
